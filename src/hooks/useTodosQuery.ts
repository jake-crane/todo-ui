import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import ky from 'ky';
import type { Todo } from '../schemas/todoSchema';
import { todoSchema } from '../schemas/todoSchema';
import { z } from 'zod';

export const useTodosQuery = (): UseQueryResult<Todo[]> => {
    return useQuery({
        queryKey: ['todos'],
        queryFn: async (): Promise<Todo[]> => {
            const data = await ky.get('./api/todos').json();
            return z.array(todoSchema).parse(data);
        }
    });
};