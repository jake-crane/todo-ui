import { useState } from 'react';
import { useTodoCreateMutation } from '../hooks/useTodoCreateMutation';

const NewTodo = (): JSX.Element => {
    const { mutate, isLoading } = useTodoCreateMutation();
    const [inputDescription, setInputDescription] = useState('');
    const [completedIsChecked, setCompletedIsChecked] = useState(false);

    const addTodo = () => {
        mutate(
            {
                completed: completedIsChecked,
                description: inputDescription
            },
            {
                onSuccess: () => {
                    setInputDescription('');
                    setCompletedIsChecked(false);
                }
            }
        );
    };

    return (
        <li>
            <input
                type="checkbox"
                checked={completedIsChecked}
                onChange={e => setCompletedIsChecked(e.target.checked)}
                disabled={isLoading}
            />
            <input value={inputDescription} onChange={e => setInputDescription(e.target.value)} disabled={isLoading} />
            <button type="button" onClick={addTodo} disabled={isLoading}>Add</button>
            {isLoading ? <span>Adding...</span> : null}
        </li>
    );
};

export default NewTodo;
