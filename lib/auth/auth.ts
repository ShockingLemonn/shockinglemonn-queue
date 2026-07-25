export function validateAdminLogin(
  username: string,
  password: string
) {
  return (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  );
}