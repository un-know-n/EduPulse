export const authPrefix = '/auth';
export const dashboardPrefix = '/dashboard';

export enum Routes {
  SignUp = `${authPrefix}/signup`,
  SignIn = `${authPrefix}/signin`,
  ResetPassword = `${authPrefix}/reset`,
  Dashboard = dashboardPrefix,
}
