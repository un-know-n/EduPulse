import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryProvider } from './cloudinary.provider';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [CloudinaryService, CloudinaryProvider, ConfigService],
  exports: [CloudinaryService, CloudinaryProvider],
})
export class CloudinaryModule {}
