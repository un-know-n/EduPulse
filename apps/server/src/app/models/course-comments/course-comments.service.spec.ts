import { Test, TestingModule } from '@nestjs/testing';
import { CourseCommentsService } from './course-comments.service';

describe('CourseCommentsService', () => {
  let service: CourseCommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseCommentsService],
    }).compile();

    service = module.get<CourseCommentsService>(CourseCommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
