import { Router, type Request, type Response } from 'express';
import prisma from '../utils/prisma.js';
import { body, param, validationResult } from 'express-validator';

const router = Router();

// Get all services
router.get('/', async (req: Request, res: Response) => {
  try {
    const services = await prisma.service.findMany({
      include: {
        elements: {
          include: {
            product: true,
          },
        },
      },
    });
    res.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Failed to fetch services' });
  }
});

// Get a single service by ID
router.get('/:id', [
  param('id').isUUID().withMessage('Invalid service ID'),
], async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  try {
    const service = await prisma.service.findUnique({
      where: { id: String(id) },
      include: {
        elements: {
          include: {
            product: true,
          },
        },
      },
    });
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    console.error(`Error fetching service ${id}:`, error);
    res.status(500).json({ message: 'Failed to fetch service' });
  }
});

// Create a new service
router.post('/', [
  body('name').notEmpty().withMessage('Service name is required'),
  body('price').isInt({ min: 0 }).withMessage('Price must be a non-negative integer'),
  body('description').optional().isString(),
  body('elements').optional().isArray(),
  body('elements.*.stockItemId').isUUID().withMessage('Invalid stock item ID for element'),
  body('elements.*.quantity').isFloat({ min: 0 }).withMessage('Quantity must be a non-negative number'),
], async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, description, price, elements } = req.body;
  try {
    const newService = await prisma.service.create({
      data: {
        name,
        description,
        priceCents: price,
        elements: {
          create: elements.map((el: any) => ({
            productId: el.stockItemId,
            quantity: el.quantity,
          })),
        },
      },
      include: {
        elements: true,
      },
    });
    res.status(201).json(newService);
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ message: 'Failed to create service' });
  }
});

// Update an existing service
router.put('/:id', [
  param('id').isUUID().withMessage('Invalid service ID'),
  body('name').notEmpty().withMessage('Service name is required'),
  body('price').isInt({ min: 0 }).withMessage('Price must be a non-negative integer'),
  body('description').optional().isString(),
  body('elements').optional().isArray(),
  body('elements.*.stockItemId').isUUID().withMessage('Invalid stock item ID for element'),
  body('elements.*.quantity').isFloat({ min: 0 }).withMessage('Quantity must be a non-negative number'),
], async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { name, description, price, elements } = req.body;
  try {
    // First, delete existing elements for this service
    await prisma.serviceElement.deleteMany({
      where: { serviceId: String(id) },
    });

    const updatedService = await prisma.service.update({
      where: { id: String(id) },
      data: {
        name,
        description,
        priceCents: price,
        updatedAt: new Date(),
        elements: {
          create: elements.map((el: any) => ({
            productId: el.stockItemId,
            quantity: el.quantity,
          })),
        },
      },
      include: {
        elements: true,
      },
    });
    res.json(updatedService);
  } catch (error) {
    console.error(`Error updating service ${id}:`, error);
    res.status(500).json({ message: 'Failed to update service' });
  }
});

// Delete a service
router.delete('/:id', [
  param('id').isUUID().withMessage('Invalid service ID'),
], async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  try {
    await prisma.service.delete({
      where: { id: String(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error(`Error deleting service ${id}:`, error);
    res.status(500).json({ message: 'Failed to delete service' });
  }
});

export default router;