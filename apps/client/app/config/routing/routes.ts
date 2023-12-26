export const authPrefix = '/auth';
export const dashboardPrefix = '/dashboard';
export const coursePrefix = '/course';
export const enrollmentPrefix = '/enrollment';
export const sectionPrefix = '/section';
export const lecturePrefix = '/lecture';

export enum Routes {
  SignUp = `${authPrefix}/signup`,
  SignIn = `${authPrefix}/signin`,
  ResetPassword = `${authPrefix}/reset`,
  Dashboard = dashboardPrefix,
  Course = coursePrefix,
}
