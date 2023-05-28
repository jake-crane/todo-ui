import { useState } from 'react';
import { useTodoCreateMutation } from '../hooks/useTodoCreateMutation';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';

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
            <Stack spacing={1} direction="row" alignItems="center">
                <Checkbox
                    size="small"
                    checked={completedIsChecked}
                    onChange={e => setCompletedIsChecked(e.target.checked)}
                    disabled={isLoading}
                />
                <TextField
                    variant="standard"
                    value={inputDescription}
                    onChange={e => setInputDescription(e.target.value)}
                    disabled={isLoading}
                    aria-label="Todo Description"
                />
                <Button
                    type="button"
                    variant="contained"
                    size="small"
                    onClick={addTodo}
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Add'}
                </Button>

            </Stack>
        </li>
    );
};

export default NewTodo;
