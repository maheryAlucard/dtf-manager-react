import { Router } from 'express';
import prisma from '../utils/prisma.js';
import { body, param, validationResult } from 'express-validator';
import { authenticateToken } from '../middleware/auth.js'; // Assuming you have an auth middleware
import type { Request, Response, NextFunction } from 'express';

const router = Router();

// Helper to handle validation errors
const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// GET /api/stock - Get all stock items with category and inventory info
router.get('/', authenticateToken, async (req, res) => {
  try {
    const stockItems = await prisma.product.findMany({
      where: { isStocked: true },
      include: {
        category: true,
        inventory: true,
      },
    });

    const formattedStock = stockItems.map((item: any) => ({
      id: item.id,
      name: item.name,
      type: item.category?.name || 'N/A',
      quantity: item.inventory[0]?.quantity || 0,
      lowStockThreshold: item.inventory[0]?.minQuantity || 0,
      unit: item.unit,
      totalValue: (item.inventory[0]?.quantity || 0) * (item.defaultPriceCents || 0), // Assuming defaultPriceCents is per unit
    }));

    res.json(formattedStock);
  } catch (error) {
    console.error('Error fetching stock items:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/stock/summary - Get stock summary by category
router.get('/summary', authenticateToken, async (req, res) => {
  try {
    const categories = await prisma.productCategory.findMany({
      include: {
        products: {
          where: { isStocked: true },
          include: {
            inventory: true,
          },
        },
      },
    });

    const summary = categories.map((category: any) => {
      const totalItems = category.products.reduce((sum: number, product: any) => sum + (product.inventory?.quantity || 0), 0);
      const totalValue = category.products.reduce((sum: number, product: any) => sum + ((product.inventory?.quantity || 0) * (product.defaultPriceCents || 0)), 0);
      return {
        id: category.id,
        name: category.name,
        totalItems,
        totalValue,
      };
    });

    res.json(summary);
  } catch (error) {
    console.error('Error fetching stock summary:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/stock/low-stock - Get low stock alerts
router.get('/low-stock', authenticateToken, async (req, res) => {
  try {
    const lowStockItems = await prisma.product.findMany({
      where: {
        isStocked: true,
      },
      include: {
        category: true,
        inventory: true,
      },
    });

    const filteredLowStock = lowStockItems.filter((item: any) =>
      item.inventory && item.inventory.quantity <= item.inventory.minQuantity
    );

    const formattedLowStock = filteredLowStock.map((item: any) => ({
      id: item.id,
      name: item.name,
      category: item.category?.name || 'N/A',
      quantity: item.inventory?.quantity || 0,
      unit: item.unit,
      minQuantity: item.inventory?.minQuantity || 0,
    }));

    res.json(formattedLowStock);
  } catch (error) {
    console.error('Error fetching low stock items:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/stock/movements - Get all stock movements
router.get('/movements', authenticateToken, async (req, res) => {
  try {
    const movements = await prisma.stockMovement.findMany({
      include: {
        product: {
          include: {
            category: true,
          },
        },
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const formattedMovements = movements.map((movement: any) => ({
      id: movement.id,
      productName: movement.product.name,
      category: movement.product.category?.name || 'N/A',
      type: movement.type,
      quantity: movement.quantity,
      unitCost: movement.unitCostCents ? movement.unitCostCents / 100 : null,
      reason: movement.reason,
      orderId: movement.relatedOrderId,
      createdBy: movement.user?.name || 'N/A',
      createdAt: movement.createdAt,
    }));

    res.json(formattedMovements);
  } catch (error) {
    console.error('Error fetching stock movements:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST /api/stock/add-update - Add or update stock for a product
router.post(
  '/add-update',
  authenticateToken,
  [
    body('productId').isUUID().withMessage('Product ID must be a valid UUID'),
    body('productName').optional().isString().trim().notEmpty().withMessage('Product name must be a non-empty string'),
    body('quantity').isFloat({ gt: 0 }).withMessage('Quantity must be a positive number'),
    body('type').isIn(['IN', 'OUT', 'adjustment']).withMessage('Invalid movement type'),
    body('reason').optional().isString().trim().notEmpty().withMessage('Reason must be a non-empty string'),
    body('unitCostCents').optional().isInt({ gt: 0 }).withMessage('Unit cost must be a positive integer'),
    body('createdBy').isUUID().withMessage('Created By must be a valid UUID'),
  ],
  handleValidationErrors,
  async (req: Request, res: Response) => {
    const { productId, productName, quantity, type, reason, unitCostCents, createdBy } = req.body;

    try {
      if (!productId) {
        return res.status(400).json({ message: 'Product ID is required' });
      }

      // Ensure product exists. If not, create it with provided name.
      const existingProduct = await prisma.product.findUnique({ where: { id: productId as string } });
      if (!existingProduct) {
        if (!productName || typeof productName !== 'string' || !productName.trim()) {
          return res.status(400).json({ message: 'Product does not exist. Provide a valid productName to create it.' });
        }
        await prisma.product.create({
          data: {
            id: productId as string,
            name: productName.trim(),
            isStocked: true,
          },
        });
      }

      let inventoryItem = await prisma.inventory.findUnique({
        where: { productId: productId as string },
      });

      let updatedInventory;
      if (inventoryItem) {
        updatedInventory = await prisma.inventory.update({
          where: { productId: productId as string },
          data: {
            quantity: {
              increment: type === 'IN' ? quantity : -quantity,
            },
          },
        });
      } else {
        updatedInventory = await prisma.inventory.create({
          data: {
            productId: productId as string,
            quantity: type === 'IN' ? quantity : -quantity,
            minQuantity: 0, // Default, can be updated separately
          },
        });
      }

      // Create stock movement record
      const stockMovement = await prisma.stockMovement.create({
        data: {
          productId,
          type,
          quantity,
          unitCostCents,
          reason,
          createdBy,
        },
      });

      res.status(201).json({ message: 'Stock updated and movement recorded', updatedInventory, stockMovement });
    } catch (error) {
      console.error('Error adding/updating stock:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

// PUT /api/stock/threshold/:productId - Update low stock threshold for a product
router.put(
  '/threshold/:productId',
  authenticateToken,
  [
    param('productId').isUUID().withMessage('Product ID must be a valid UUID'),
    body('minQuantity').isInt({ min: 0 }).withMessage('Minimum quantity must be a non-negative integer'),
  ],
  handleValidationErrors,
  async (req: Request, res: Response) => {
    const { productId } = req.params;
    const { minQuantity } = req.body;

    try {
      const updatedInventory = await prisma.inventory.update({
        where: { productId: productId as string },
        data: { minQuantity },
      });

      res.json({ message: 'Low stock threshold updated', updatedInventory });
    } catch (error) {
      console.error('Error updating low stock threshold:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

export default router;