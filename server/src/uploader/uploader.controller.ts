import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './multerOptions';

@Controller('upload')
export class UploaderController {
  @Post('image')
  //It handles the image file and store it in the specified path and naming it with a random name
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async upload(@UploadedFile() file) {
    return { path: file.filename };
  }
}
