import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';

type User = { id: number; name: string; username: string; email: string };
type Todo = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user: User;
};

const sanitizeTitle = (value: string) => {
  // allow letters (any language), digits and spaces
  return value.replace(/[^\p{L}\d ]+/gu, '');
};

export const App = () => {
  const initialTodos: Todo[] = todosFromServer.map(t => ({
    ...t,
    user: usersFromServer.find(u => u.id === t.userId)!,
  }));

  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('0');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = sanitizeTitle(e.target.value);

    setTitle(v);
    if (submitClicked && titleError && v.trim() !== '') {
      setTitleError(false);
    }
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(e.target.value);
    if (submitClicked && userError && e.target.value !== '0') {
      setUserError(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitClicked(true);

    const hasTitle = title.trim() !== '';
    const hasUser = userId !== '0';

    setTitleError(!hasTitle);
    setUserError(!hasUser);

    if (!hasTitle || !hasUser) {
      return;
    }

    const numericUserId = Number(userId);
    const user = usersFromServer.find(u => u.id === numericUserId)!;

    const maxId = todos.length ? Math.max(...todos.map(t => t.id)) : 0;
    const newTodo: Todo = {
      id: maxId + 1,
      title: title.trim(),
      userId: numericUserId,
      completed: false,
      user,
    };

    setTodos([...todos, newTodo]);

    // clear form
    setTitle('');
    setUserId('0');
    setSubmitClicked(false);
    setTitleError(false);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>
            Title
            <input
              type="text"
              placeholder="Enter title"
              data-cy="titleInput"
              value={title}
              onChange={handleTitleChange}
            />
          </label>
          {submitClicked && titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            User
            <select
              data-cy="userSelect"
              value={userId}
              onChange={handleUserChange}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map((u: User) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </label>

          {submitClicked && userError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
