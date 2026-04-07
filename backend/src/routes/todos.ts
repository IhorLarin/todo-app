import { Router, Response } from 'express';
import { db } from '../db';
import { todos } from '../db/schema';
import { eq, and } from 'drizzle-orm';
import { authMiddleware } from '../middleware/auth';
import { AuthRequest, IdParam } from '../types';

const router = Router();

router.use(authMiddleware);

// GET /api/todos — всі задачі користувача
router.get('/', async (req: AuthRequest, res: Response) => {
    try {
        const result = await db.select().from(todos).where(eq(todos.userId, req.userId!));
        res.json(result);
    } catch {
        res.status(500).json({ error: 'Server error' });
    }
});

// POST /api/todos — створити задачу
router.post('/', async (req: AuthRequest, res: Response) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'Title required' });
    }

    try {
        const [todo] = await db.insert(todos).values({
            userId: req.userId!,
            title,
        }).returning();
        res.status(201).json(todo);
    } catch {
        res.status(500).json({ error: 'Server error' });
    }
});

// PATCH /api/todos/:id — оновити задачу
router.patch('/:id', async (req: AuthRequest<IdParam>, res: Response) => {
    const { id } = req.params;
    const { title, completed } = req.body;

    try {
        const [todo] = await db.update(todos)
            .set({
                ...(title !== undefined && { title }),
                ...(completed !== undefined && { completed }),
                updatedAt: new Date(),
            })
            .where(and(eq(todos.id, id), eq(todos.userId, req.userId!)))
            .returning();

        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.json(todo);
    } catch {
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE /api/todos/:id — видалити задачу
router.delete('/:id', async (req: AuthRequest<IdParam>, res: Response) => {
    const { id } = req.params;

    try {
        const [todo] = await db.delete(todos)
            .where(and(eq(todos.id, id), eq(todos.userId, req.userId!)))
            .returning();

        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.json({ message: 'Deleted successfully' });
    } catch {
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
