import { useTodosQuery } from '../hooks/useTodosQuery';
import NewTodo from './NewTodo';
import Todo from './Todo';

const Todos = (): JSX.Element => {
    const { data, isLoading, isError } = useTodosQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>An error occurred fetching Todos</div>;
    }

    return (
        <ul>
            {data.map(todo => <Todo key={todo.id} todo={todo} />)}
            <NewTodo />
        </ul>
    );
};

export default Todos;