import { Test, TestingModule } from '@nestjs/testing';
import { CourseCommentsGateway } from './course-comments.gateway';
import { CourseCommentsService } from './course-comments.service';

describe('CourseCommentsGateway', () => {
  let gateway: CourseCommentsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseCommentsGateway, CourseCommentsService],
    }).compile();

    gateway = module.get<CourseCommentsGateway>(CourseCommentsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
