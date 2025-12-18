export const UserInfo = ({
  user,
}: {
  user: { id: number; name: string; username: string; email: string };
}) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
