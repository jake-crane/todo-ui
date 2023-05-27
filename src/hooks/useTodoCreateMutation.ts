import type { UseMutationResult } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import ky from 'ky';

interface NewTodo {
    description: string
    completed: boolean;
}

export const useTodoCreateMutation = (): UseMutationResult<unknown, unknown, NewTodo> => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (todo) => {
            await ky.post('./api/todos', { json: todo });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        }
    });
};