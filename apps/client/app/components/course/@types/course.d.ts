import { TDifficultyLevel } from '../labels/DifficultyLabel';
import { MaterialTypes } from '../config/constants';

export type TEnrollment = {
  id: string;
  userId: string;
  courseId: string;
  assignedAt: string;
  expiresAt: string;
  isCompleted: boolean;
  isFailed: boolean;
  updatedAt: string;
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
  id: string;
  text: string;
  points: number;
  isMultipleChoice: boolean;
  answers: TAnswerResponse[];
};

type TAnswerResponse = {
  id: string;
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

export type TCourseContentResponse = {
  title: string;
  id: string;
  sections: {
    title: string;
    id: string;
    materials: {
      id: string;
      title: string;
      type: keyof typeof MaterialTypes;
    }[];
  }[];
};

export type TCourseStatisticsResponse = {
  currentCourseProgress: number;
  minimalCourseProgress: number;
  sectionsDetails: {
    sectionTitle: string;
    totalTests: number;
    passedTests: number;
    totalPoints: number;
    receivedPoints: number;
    progressInPercents: number;
  }[];
  detailedEvaluations: {
    sectionTitle: string;
    sectionId: string;
    tests: {
      id: string;
      title: string;
      receivedPoints?: number;
      totalPoints?: number;
    }[];
  }[];
};

export type TCourseDatesResponse = {
  dates: {
    date: string;
    description: string;
    isActive: boolean;
  }[];
};

export type TCourseMaterialResponse = {
  type: keyof typeof MaterialTypes;
  material: TTestMaterial | TLectureResponse;
};

export type TTestMaterial = TTestResponse & { result: TTestResultResponse };

type TTestResultResponse = {
  score: number;
  currentAttempt: number;
  isCompleted: boolean;
  correctAnswers: TQuestionResponse[];
};

export type TTestMaterialRequest = {
  testId: string;
  answers: {
    questionId: string;
    selectedAnswers: string[];
  }[];
};

export type TCourseCommentResponse = {
  id: string;
  text: string;
  createdAt: string;
  userId: string;
  courseId: string;
  user: { name: string; image: string };
  course: { creatorId: string };
};

export type TUserRoles = 'student' | 'teacher';

export type Nullable<T> = { [K in keyof T]?: T[K] };
