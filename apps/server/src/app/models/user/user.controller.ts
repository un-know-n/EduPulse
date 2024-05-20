import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from '../../common/guards/jwt.guard';
import {
  CloudinaryService,
  parseFilePipe,
} from '../../common/modules/cloudinary/cloudinary.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  getUserProfile(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @UseGuards(JwtGuard)
  @Patch('profile/:id')
  @UseInterceptors(FileInterceptor('file'))
  updateProfile(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile(parseFilePipe) file?: Express.Multer.File,
  ) {
    return this.cloudinaryService.executeWithImage(
      (imageUrl?: string) =>
        this.userService.updateProfile(id, updateUserDto, imageUrl),
      file,
    );
  }
}
