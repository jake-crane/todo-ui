import type { UseMutationResult } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import ky from 'ky';
import type { Todo } from '../schemas/todoSchema';

export const useTodoUpdateMutation = (): UseMutationResult<unknown, unknown, Todo> => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (todo) => {
            await ky.put(`./api/todos/${todo.id}`, {
                json: todo
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        }
    });
};