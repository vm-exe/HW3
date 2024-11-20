import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

// Middleware para procesar JSON
app.use(express.json());

// Crear un producto
app.post('/products', async (req: Request, res: Response) => {
  const { name, price } = req.body;

  try {
    const product = await prisma.products.create({
      data: {
        name,
        price,
      },
    });
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el producto' });
  }
});

// Obtener todos los productos
app.get('/products', async (req: Request, res: Response) => {
  try {
    const products = await prisma.products.findMany();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

// Actualizar un producto por ID
app.put('/products/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price } = req.body;

  try {
    const product = await prisma.products.update({
      where: { id: parseInt(id, 10) },
      data: {
        name,
        price,
      },
    });

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});

// Eliminar un producto por ID
app.delete('/products/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.products.delete({
      where: { id: parseInt(id, 10) },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});

// Inicializar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
