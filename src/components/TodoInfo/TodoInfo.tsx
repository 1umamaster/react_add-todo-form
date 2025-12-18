import { UserInfo } from '../UserInfo/UserInfo';

export const TodoInfo = ({
  todo,
}: {
  todo: {
    id: number;
    title: string;
    userId: number;
    completed: boolean;
    user: { id: number; name: string; username: string; email: string };
  };
}) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todo.user} />
    </article>
  );
};
