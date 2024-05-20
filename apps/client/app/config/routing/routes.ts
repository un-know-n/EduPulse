export const authPrefix = '/auth';
export const dashboardPrefix = '/dashboard';
export const coursePrefix = '/course';
export const enrollmentPrefix = '/enrollment';
export const sectionPrefix = '/section';
export const lecturePrefix = '/lecture';
export const profilePrefix = '/profile';

export enum Routes {
  SignUp = `${authPrefix}/signup`,
  SignIn = `${authPrefix}/signin`,
  ResetPassword = `${authPrefix}/reset`,
  Dashboard = dashboardPrefix,
  Course = coursePrefix,
  ProfileView = `${profilePrefix}/view`,
  ProfileCertificate = `${profilePrefix}/certificate`,
  ProfileSettings = `${profilePrefix}/edit`,
  SearchCourse = `${coursePrefix}/search`,
  CreateCourse = `${coursePrefix}/create`,
}
