import 'multer';

import {
  BadRequestException,
  FileTypeValidator,
  Injectable,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary-response';
import * as streamifier from 'streamifier';

export const maxImageSize = 1024 * 1024; // measured in bytes
export const parseFilePipe = new ParseFilePipe({
  validators: [
    new MaxFileSizeValidator({
      maxSize: maxImageSize,
      message: `Зображення повинно бути меншим за 1MB`,
    }),
    new FileTypeValidator({
      fileType: new RegExp('image\\/(jpeg|jpg|png)'),
    }),
  ],
  fileIsRequired: false,
});

@Injectable()
export class CloudinaryService {
  async executeWithImage(
    callback: (imageUrl?: string) => any,
    image?: Express.Multer.File,
  ) {
    if (image)
      return this.uploadImage(image)
        .then((image) => callback(image.url))
        .catch((error) => {
          throw new BadRequestException(error.message);
        });
    return callback();
  }

  uploadImage(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  deleteImage(fileUrl: string) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(fileUrl, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }
}
