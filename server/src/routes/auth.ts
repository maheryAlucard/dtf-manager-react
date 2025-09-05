import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import prisma from '../utils/prisma.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey'; // Use environment variable for secret

// Helper function to generate a password reset token
const generatePasswordResetToken = () => {
  return uuidv4(); // Using UUID for simplicity, can be more complex
};

// Helper function to hash a token (for storing in DB)
const hashToken = (token: string) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      // For security, always return a generic success message even if user not found
      return res.json({ message: 'If a user with that email exists, a password reset link has been sent.' });
    }

    const resetToken = generatePasswordResetToken();
    const hashedToken = hashToken(resetToken);
    const resetTokenExpires = new Date(Date.now() + 3600000); // 1 hour from now

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken: hashedToken,
        resetTokenExpires: resetTokenExpires,
      },
    });

    // In a real application, you would send an email here
    console.log(`Password reset link for ${email}: http://localhost:5173/reset-password/${resetToken}`);

    res.json({ message: 'If a user with that email exists, a password reset link has been sent.' });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ message: 'Token and new password are required' });
  }

  try {
    const hashedToken = hashToken(token);
    const user = await prisma.user.findFirst({
      where: {
        resetToken: hashedToken,
        resetTokenExpires: {
          gt: new Date(), // Token must not be expired
        },
      },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired password reset token.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash: hashedPassword,
        resetToken: null,
        resetTokenExpires: null,
      },
    });

    res.json({ message: 'Password has been reset successfully.' });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'User with that email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Find or create 'employee' role
    let employeeRole = await prisma.role.findUnique({ where: { name: 'employee' } });
    if (!employeeRole) {
      employeeRole = await prisma.role.create({
        data: {
          name: 'employee',
          description: 'Standard employee role',
        },
      });
    }

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
        roleId: employeeRole.id,
        isActive: true,
      },
    });

    // Generate JWT
    const token = jwt.sign(
      { userId: newUser.id, roleId: newUser.roleId },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Return user data and token (excluding passwordHash)
    const { passwordHash, ...userWithoutPassword } = newUser;
    res.status(201).json({ message: 'User registered successfully', token, user: userWithoutPassword });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.passwordHash) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, roleId: user.roleId },
      JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Return user data and token (excluding passwordHash)
    const { passwordHash, ...userWithoutPassword } = user;
    res.json({ message: 'Login successful', token, user: userWithoutPassword });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;