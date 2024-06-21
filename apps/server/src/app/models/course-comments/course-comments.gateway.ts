import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CourseCommentsService } from './course-comments.service';
import { CreateCourseCommentDto } from './dto/create-course-comment.dto';
import { UpdateCourseCommentDto } from './dto/update-course-comment.dto';

@WebSocketGateway({
  namespace: 'course-comments',
  cors: {
    origin: '*',
  },
})
export class CourseCommentsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(private readonly courseCommentsService: CourseCommentsService) {}

  @SubscribeMessage('createCourseComment')
  async create(@MessageBody() createCourseCommentDto: CreateCourseCommentDto) {
    const createdComment = await this.courseCommentsService.create(
      createCourseCommentDto,
    );
    this.server.emit('receiveCourseComment', [createdComment]);
  }

  @SubscribeMessage('findAllSortedCourseComments')
  async findAllSorted(
    @MessageBody('courseId') courseId: string,
    @MessageBody('sortOrder') sortOrder: 'asc' | 'desc' = 'asc',
  ) {
    const sortedComments = await this.courseCommentsService.findAllSorted(
      courseId,
      sortOrder,
    );
    this.server.emit('receiveCourseComment', sortedComments);
  }

  afterInit(server: any) {
    console.log(`Server started: ${server}`);
  }
  handleConnection(client: Socket) {
    console.log(`Connection established, client id: ${client.id}`);
  }
  handleDisconnect(client: Socket) {
    console.log(`Disconnected, client id: ${client.id}`);
  }

  // @SubscribeMessage('findOneCourseComment')
  // findOne(@MessageBody() id: number) {
  //   return this.courseCommentsService.findOne(id);
  // }

  // @SubscribeMessage('updateCourseComment')
  // update(@MessageBody() updateCourseCommentDto: UpdateCourseCommentDto) {
  //   return this.courseCommentsService.update(
  //     updateCourseCommentDto.id,
  //     updateCourseCommentDto,
  //   );
  // }

  // @SubscribeMessage('removeCourseComment')
  // remove(@MessageBody() id: number) {
  //   return this.courseCommentsService.remove(id);
  // }
}
