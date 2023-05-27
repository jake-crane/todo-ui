import { useState } from 'react';
import { useTodoDeleteMutation } from '../hooks/useTodoDeleteMutation';
import type { Todo as TodoType } from '../schemas/todoSchema';
import { useTodoUpdateMutation } from '../hooks/useTodoUpdateMutation';

interface ComponentProps {
    todo: TodoType;
}

const Todo = ({ todo }: ComponentProps): JSX.Element => {
    const updateMutation = useTodoUpdateMutation();
    const deleteMutation = useTodoDeleteMutation();
    const [inputDescription, setInputDescription] = useState(todo.description);
    const [completedIsChecked, setCompletedIsChecked] = useState(todo.completed);

    const unsavedChanges = todo.completed !== completedIsChecked || todo.description !== inputDescription;
    const isLoading = updateMutation.isLoading || deleteMutation.isLoading;

    const updateTodo = () => {
        updateMutation.mutate({ ...todo, completed: completedIsChecked, description: inputDescription });
    };

    const deleteTodo = () => {
        deleteMutation.mutate(todo);
    };

    return (
        <li>
            <input
                type="checkbox"
                checked={completedIsChecked}
                onChange={e => setCompletedIsChecked(e.target.checked)}
                disabled={isLoading}
            />
            <input
                value={inputDescription}
                onChange={e => setInputDescription(e.target.value)}
                disabled={isLoading}
            />
            <button type="button" onClick={updateTodo} disabled={isLoading}>Save</button>
            <button type="button" onClick={deleteTodo} disabled={isLoading}>Delete</button>
            {(unsavedChanges && !isLoading) ? <span>Unsaved Changes</span> : null}
            {updateMutation.isLoading ? <span>Updating...</span> : null}
            {deleteMutation.isLoading ? <span>Deleting...</span> : null}
        </li>
    );
};

export default Todo;
