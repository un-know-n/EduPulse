import { TDifficultyLevel } from '../labels/DifficultyLabel';

export type TEnrollment = {
  id: string;
  userId: string;
  courseId: string;
  assignedAt: string;
  expiresAt: string;
  isCompleted: boolean;
};

export type TCourseResponse = {
  id: string;
  title: string;
  purpose: string;
  description: string;
  creatorId: string;
  createdAt: string;
  timeToPass: number;
  image: string;
  categoryId?: number;
  difficultyLevel: TDifficultyLevel;
  numberOfPeopleEnrolled: number;
  sections: TSectionResponse[];
  user: { name: string };
  UsersAssignedToCourse?: TEnrollment[];
};

export type TSectionResponse = {
  id: string;
  title: string;
  courseId: string;
  createdAt: string;
  lectures: TLectureResponse[];
  tests: TTestResponse[];
};

export type TTestResponse = {
  id: string;
  title: string;
  timeToPass: number;
  totalAttempts: number;
  sectionId: string;
  createdAt: string;
  questions: TQuestionResponse[];
};

type TQuestionResponse = {
  text: string;
  points: number;
  isMultipleChoice: boolean;
  answers: TAnswerResponse[];
};

type TAnswerResponse = {
  text: string;
  isCorrect: boolean;
};

export type TCertificateResponse = {
  author: string;
  title: string;
  mark: number;
};

export type TCategoriesResponse = {
  id: number;
  title: string;
};

export type TUserResponse = {
  id: string;
  name: string;
  description: string;
  email: string;
  emailVerified?: string;
  role: string;
  image?: string;
  createdAt: string;
};

export type TEnrollmentResponse = TEnrollment & {
  course: TCourseResponse & { user: TUserResponse };
};

export type TCourseWithAuthorResponse = TCourseResponse & {
  user: TUserResponse;
};

export type TLectureResponse = Record<
  'id' | 'title' | 'content' | 'createdAt' | 'sectionId',
  string
> & { videoUrl?: string };

export type TUserRoles = 'student' | 'teacher';

export type Nullable<T> = { [K in keyof T]?: T[K] };
