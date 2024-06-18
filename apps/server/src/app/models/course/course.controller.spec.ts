import { Test, TestingModule } from '@nestjs/testing';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CloudinaryService } from '../../common/modules/cloudinary/cloudinary.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { TeacherRoleGuard } from '../../common/guards/teacher-role.guard';
import { PrismaService } from '../../prisma.service';

// describe('CourseController', () => {
//   let controller: CourseController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [CourseController],
//       providers: [CourseService],
//     }).compile();

//     controller = module.get<CourseController>(CourseController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });

describe('CourseController', () => {
  let courseController: CourseController;
  let courseService: CourseService;
  let cloudinaryService: CloudinaryService;

  beforeEach(async () => {
    const mockJwtService = {
      sign: jest.fn().mockReturnValue('token'),
      verify: jest.fn().mockReturnValue({ userId: 'testId' }),
    };

    const mockJwtGuard = {
      canActivate: (context: ExecutionContext) => {
        return true;
      },
    };

    const mockTeacherRoleGuard = {
      canActivate: (context: ExecutionContext) => {
        return true;
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseController],
      providers: [
        Reflector,
        {
          provide: CourseService,
          useValue: {
            getAllCategories: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            findAll: jest.fn(),
            findCreatedCourses: jest.fn(),
            findOne: jest.fn(),
            searchCourses: jest.fn(),
            findWithEnrollment: jest.fn(),
            deletePreviousCourseImage: jest.fn(),
          },
        },
        {
          provide: CloudinaryService,
          useValue: {
            executeWithImage: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },

        {
          provide: JwtGuard,
          useValue: mockJwtGuard,
        },
        {
          provide: TeacherRoleGuard,
          useValue: mockTeacherRoleGuard,
        },
        {
          provide: PrismaService,
          useValue: {
            test: {
              create: jest.fn(),
              findUnique: jest.fn(),
              delete: jest.fn(),
              update: jest.fn(),
            },
            $transaction: jest.fn(),
          },
        },
      ],
    }).compile();

    courseController = module.get<CourseController>(CourseController);
    courseService = module.get<CourseService>(CourseService);
    cloudinaryService = module.get<CloudinaryService>(CloudinaryService);
  });

  it('should be defined', () => {
    expect(courseController).toBeDefined();
  });

  describe('getAllCategories', () => {
    it('should get all categories', async () => {
      const result = [{ id: 1, name: 'Category 1' }];
      jest
        .spyOn(courseService, 'getAllCategories')
        .mockImplementation(async () => result as any);

      expect(await courseController.getAllCategories()).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a new course', async () => {
      const createCourseDto: CreateCourseDto = {
        title: 'Test Course',
        description: 'Test Description',
        categoryId: 1,
        creatorId: 'creatorId',
        difficultyLevel: 2,
        purpose: 'purpose',
        timeToPass: 20000,
        // other properties...
      };
      const file: Express.Multer.File = {} as any;
      const result = { id: 'courseId', ...createCourseDto };
      jest
        .spyOn(cloudinaryService, 'executeWithImage')
        .mockImplementation(async (callback) => callback('fileUrl'));
      jest
        .spyOn(courseService, 'create')
        .mockImplementation(async () => result as any);

      expect(await courseController.create(createCourseDto, file)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a course', async () => {
      const updateCourseDto: UpdateCourseDto = {
        title: 'Updated Course',
        description: 'Updated Description',
        categoryId: 2,

        difficultyLevel: 3,
        purpose: 'purpose',
        timeToPass: 20000,
        // other properties...
      };
      const file: Express.Multer.File = {} as any;
      const result = { id: 'courseId', ...updateCourseDto };
      jest
        .spyOn(cloudinaryService, 'executeWithImage')
        .mockImplementation(async (callback) => callback('fileUrl'));
      jest
        .spyOn(courseService, 'update')
        .mockImplementation(async () => result as any);

      expect(
        await courseController.update('courseId', file, updateCourseDto),
      ).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove a course', async () => {
      const result = { id: 'courseId' };
      jest
        .spyOn(courseService, 'remove')
        .mockImplementation(async () => result as any);

      expect(await courseController.remove('courseId')).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should find all courses', async () => {
      const user = { id: 'userId' };
      const result = [{ id: 'courseId', title: 'Course 1' }];
      jest
        .spyOn(courseService, 'findAll')
        .mockImplementation(async () => result as any);

      expect(await courseController.findAll(user as any)).toBe(result);
    });
  });

  describe('findCreatedCourses', () => {
    it('should find all created courses by user', async () => {
      const user = { id: 'userId' };
      const result = [{ id: 'courseId', title: 'Created Course' }];
      jest
        .spyOn(courseService, 'findCreatedCourses')
        .mockImplementation(async () => result as any);

      expect(await courseController.findCreatedCourses(user as any)).toBe(
        result,
      );
    });
  });

  describe('findOne', () => {
    it('should find one course', async () => {
      const user = { id: 'userId' };
      const result = { id: 'courseId', title: 'Course 1' };
      jest
        .spyOn(courseService, 'findWithEnrollment')
        .mockImplementation(async () => result as any);

      expect(await courseController.findOne('courseId', user as any)).toBe(
        result,
      );
    });
  });

  describe('searchCourses', () => {
    it('should search for courses', async () => {
      const user = { id: 'userId' };
      const result = [{ id: 'courseId', title: 'Course 1' }];
      jest
        .spyOn(courseService, 'searchCourses')
        .mockImplementation(async () => result as any);

      expect(
        await courseController.searchCourses(
          user as any,
          'Course',
          undefined,
          undefined,
          'asc',
          1,
          10,
          0,
        ),
      ).toBe(result);
    });
  });
});
