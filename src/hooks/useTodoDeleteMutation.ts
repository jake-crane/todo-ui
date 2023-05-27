import type { UseMutationResult } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import ky from 'ky';
import type { Todo } from '../schemas/todoSchema';

export const useTodoDeleteMutation = (): UseMutationResult<unknown, unknown, Todo> => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (todo) => {
            await ky.delete(`./api/todos/${todo.id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        }
    });
};