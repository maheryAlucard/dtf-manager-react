import prisma from '../utils/prisma.js';
import bcrypt from 'bcrypt';

async function clearData() {
	await prisma.activityLog.deleteMany();
	await prisma.attachment.deleteMany();
	await prisma.payment.deleteMany();
	await prisma.invoice.deleteMany();
	await prisma.orderItem.deleteMany();
	await prisma.printJob.deleteMany();
	await prisma.order.deleteMany();
	await prisma.quoteItem.deleteMany();
	await prisma.quote.deleteMany();
	await prisma.machineSettingsHistory.deleteMany();
	await prisma.machineProfile.deleteMany();
	await prisma.stockMovement.deleteMany();
	await prisma.inventory.deleteMany();
	await prisma.serviceElement.deleteMany();
	await prisma.service.deleteMany();
	await prisma.product.deleteMany();
	await prisma.productCategory.deleteMany();
	await prisma.expense.deleteMany();
	await prisma.expenseCategory.deleteMany();
	await prisma.supplier.deleteMany();
	await prisma.client.deleteMany();
	await prisma.rolePermission.deleteMany();
	await prisma.permission.deleteMany();
	await prisma.user.deleteMany();
	await prisma.role.deleteMany();
	await prisma.appConfig.deleteMany();
}

async function seedCore() {
	// Roles
	const [adminRole, employeeRole] = await Promise.all([
		prisma.role.create({ data: { name: 'admin', description: 'Administrator' } }),
		prisma.role.create({ data: { name: 'employee', description: 'Employee' } }),
	]);

	// Permissions (illustrative minimal set)
	const permissions = await prisma.$transaction([
		prisma.permission.create({ data: { code: 'orders.read', description: 'Read orders' } }),
		prisma.permission.create({ data: { code: 'orders.write', description: 'Write orders' } }),
		prisma.permission.create({ data: { code: 'stock.manage', description: 'Manage stock' } }),
		prisma.permission.create({ data: { code: 'invoices.manage', description: 'Manage invoices' } }),
	]);

	await prisma.$transaction(
		permissions.map((p) =>
			prisma.rolePermission.create({ data: { roleId: adminRole.id, permissionId: p.id } })
		)
	);

	// Users
	const passwordHash = await bcrypt.hash('password123', 10);
	const [admin, employee] = await Promise.all([
		prisma.user.create({
			data: {
				roleId: adminRole.id,
				name: 'Admin User',
				email: 'admin@example.com',
				passwordHash,
			},
		}),
		prisma.user.create({
			data: {
				roleId: employeeRole.id,
				name: 'Employee One',
				email: 'employee@example.com',
				passwordHash,
			},
		}),
	]);

	// Clients
	const [acme, beta] = await Promise.all([
		prisma.client.create({ data: { name: 'ACME Corp', email: 'contact@acme.test', phone: '+1 555 0100' } }),
		prisma.client.create({ data: { name: 'Beta Industries', email: 'hello@beta.test', phone: '+1 555 0101' } }),
	]);

	// Product Categories
	const [materialsCat, servicesCat] = await Promise.all([
		prisma.productCategory.create({ data: { name: 'Materials', type: 'material' } }),
		prisma.productCategory.create({ data: { name: 'Services', type: 'service' } }),
	]);

	// Products
	const [dtfFilm, uvInk, lamination] = await prisma.$transaction([
		prisma.product.create({
			data: {
				categoryId: materialsCat.id,
				sku: 'FILM-30CM',
				name: 'DTF Film 30cm',
				description: 'Roll of DTF film 30cm width',
				unit: 'meter',
				defaultPriceCents: 1500,
				isStocked: true,
			},
		}),
		prisma.product.create({
			data: {
				categoryId: materialsCat.id,
				sku: 'INK-UV',
				name: 'UV Ink (White)',
				description: 'UV white ink 1L',
				unit: 'ml',
				defaultPriceCents: 300,
				isStocked: true,
			},
		}),
		prisma.product.create({
			data: {
				categoryId: servicesCat.id,
				sku: 'LAM-SVC',
				name: 'Lamination Service',
				description: 'Protective lamination service',
				unit: 'service',
				defaultPriceCents: 5000,
				isStocked: false,
			},
		}),
	]);

	// Inventory
	await prisma.$transaction([
		prisma.inventory.create({ data: { productId: dtfFilm.id, quantity: 100, minQuantity: 10, location: 'A1' } }),
		prisma.inventory.create({ data: { productId: uvInk.id, quantity: 2000, minQuantity: 500, location: 'Chem-1' } }),
	]);

	// Services
	const printService = await prisma.service.create({
		data: { name: 'DTF Printing', description: 'Direct To Film printing', priceCents: 20000 },
	});

	await prisma.serviceElement.createMany({
		data: [
			{ serviceId: printService.id, productId: dtfFilm.id, quantity: 1.5 },
			{ serviceId: printService.id, productId: uvInk.id, quantity: 50 },
		],
	});

	// Machine profile
	const machine = await prisma.machineProfile.create({
		data: { name: 'DTF Printer A', vendor: 'Epson', model: 'L1800', colorChannels: 'CMYK+W', resolutionDpi: 1440 },
	});

	// Order + Print Job + Items
	const order = await prisma.order.create({
		data: {
			orderNumber: 'ORD-1001',
			clientId: acme.id,
			status: 'confirmed',
			dueDate: new Date(Date.now() + 3 * 24 * 3600 * 1000),
			createdBy: admin.id,
			items: {
				create: [
					{ description: 'Custom T-shirt prints', quantity: 50, unitPriceCents: 1200, taxRatePct: 20 },
				],
			},
			printJobs: {
				create: [
					{
						filmType: 'DTF Film',
						inkSet: 'CMYK+W',
						widthMm: 300,
						heightMm: 400,
						passes: 8,
						whiteInkLayers: 2,
						machineProfileId: machine.id,
						status: 'queued',
					},
				],
			},
		},
		include: { items: true, printJobs: true },
	});

	// Invoice + Payment
	const invoice = await prisma.invoice.create({
		data: {
			invoiceNumber: 'INV-1001',
			orderId: order.id,
			status: 'sent',
			subtotalCents: 60000,
			taxCents: 12000,
			totalCents: 72000,
		},
	});

	await prisma.payment.create({
		data: { invoiceId: invoice.id, amountCents: 30000, method: 'cash', notes: 'Deposit' },
	});

	// Stock movements
	await prisma.$transaction([
		prisma.stockMovement.create({
			data: {
				productId: dtfFilm.id,
				type: 'OUT',
				quantity: 5,
				reason: 'Order consumption',
				relatedOrderId: order.id,
				createdBy: employee.id,
			},
		}),
		prisma.stockMovement.create({
			data: {
				productId: uvInk.id,
				type: 'OUT',
				quantity: 300,
				reason: 'Order consumption',
				relatedOrderId: order.id,
				createdBy: employee.id,
			},
		}),
	]);

	// App config
	await prisma.appConfig.createMany({
		data: [
			{ key: 'company.name', value: 'DTF Manager Demo' },
			{ key: 'company.currency', value: 'MGA' },
		],
	});
}

async function main() {
	console.log('Seeding database...');
	await clearData();
	await seedCore();
	console.log('Seeding completed.');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});


