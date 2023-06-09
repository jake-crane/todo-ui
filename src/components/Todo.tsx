import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useTodoDeleteMutation } from '../hooks/useTodoDeleteMutation';
import { useTodoUpdateMutation } from '../hooks/useTodoUpdateMutation';
import type { Todo as TodoType } from '../schemas/todoSchema';

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
            <Stack spacing={1} direction="row" marginBottom={1} alignItems="center">
                <Checkbox
                    size="small"
                    checked={completedIsChecked}
                    onChange={e => setCompletedIsChecked(e.target.checked)}
                    disabled={isLoading}
                    inputProps={{ 'aria-label': 'Done' }}
                />
                <TextField
                    variant="standard"
                    value={inputDescription}
                    onChange={e => setInputDescription(e.target.value)}
                    disabled={isLoading}
                    inputProps={{ 'aria-label': 'Todo Description' }}
                />
                <Button
                    type="button"
                    variant="contained"
                    color="error"
                    onClick={deleteTodo}
                    disabled={isLoading}
                >
                    {deleteMutation.isLoading ? <CircularProgress size={20} color="inherit" /> : 'Delete'}
                </Button>
                <Button
                    type="button"
                    variant="contained"
                    onClick={updateTodo}
                    disabled={isLoading || !unsavedChanges}
                >
                    {updateMutation.isLoading ? <CircularProgress size={20} color="inherit" /> : 'Save'}
                </Button>
            </Stack>
        </li>
    );
};

export default Todo;
