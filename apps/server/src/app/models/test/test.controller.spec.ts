import { Test, TestingModule } from '@nestjs/testing';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { PrismaService } from '../../prisma.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import moment from 'moment';

// describe('TestController', () => {
//   let controller: TestController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [TestController],
//       providers: [TestService],
//     }).compile();

//     controller = module.get<TestController>(TestController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });

describe('TestController', () => {
  let testController: TestController;
  let testService: TestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestController],
      providers: [
        TestService,
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

    testController = module.get<TestController>(TestController);
    testService = module.get<TestService>(TestService);
  });

  it('should be defined', () => {
    expect(testController).toBeDefined();
  });

  describe('create', () => {
    it('should create a new test', async () => {
      const createTestDto: CreateTestDto = {
        sectionId: 'sectionId',
        title: 'New Test',
        totalAttempts: 3,
        timeToPass: 60,
        questions: [
          {
            text: 'Sample Question',
            points: 10,
            isMultipleChoice: false,
            answers: [
              { text: 'Answer 1', isCorrect: true },
              { text: 'Answer 2', isCorrect: false },
            ],
          },
        ],
      };
      const result = {
        id: 'testId',
        createdAt: new Date(moment.now()),
        ...createTestDto,
      };
      jest.spyOn(testService, 'create').mockImplementation(async () => result);

      expect(await testController.create(createTestDto)).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a test by id', async () => {
      const result = { id: 'testId' };
      jest
        .spyOn(testService, 'findOne')
        .mockImplementation(async () => result as any);

      expect(await testController.findOne('testId')).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a test by id', async () => {
      const updateTestDto: UpdateTestDto = {
        sectionId: 'newSectionId',
        title: 'Updated Test',
        totalAttempts: 2,
        timeToPass: 45,
        questions: [
          {
            text: 'Updated Question',
            points: 20,
            isMultipleChoice: true,
            answers: [
              { text: 'Updated Answer 1', isCorrect: true },
              { text: 'Updated Answer 2', isCorrect: false },
            ],
          },
        ],
      };
      const result = {
        id: 'testId',
        createdAt: new Date(moment.now()),
        ...updateTestDto,
      };
      jest
        .spyOn(testService, 'update')
        .mockImplementation(async () => result as any);

      expect(await testController.update('testId', updateTestDto)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove a test by id', async () => {
      const result = { id: 'testId', title: 'Test Title' };
      jest
        .spyOn(testService, 'remove')
        .mockImplementation(async () => result as any);

      expect(await testController.remove('testId')).toBe(result);
    });
  });
});
