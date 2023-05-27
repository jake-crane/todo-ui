import { z } from 'zod';

export const todoSchema = z.object({
    id: z.number(),
    description: z.string(),
    completed: z.boolean()
});

export type Todo = z.infer<typeof todoSchema>; 