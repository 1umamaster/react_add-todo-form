import { TodoInfo } from '../TodoInfo/TodoInfo';

export const TodoList = ({ todos }: { todos: Array<{ id: number; title: string; userId: number; completed: boolean; user: { id: number; name: string; username: string; email: string } }> }) => {
  return (
    <>
      {todos.map((t) => (
        <TodoInfo key={t.id} todo={t} />
      ))}
    </>
  );
};
