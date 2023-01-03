import { ThumpSnapEntity } from '@/thumb-snap/entities/thumpSnap.entity';
import { UploadServiceInterface } from '@/uploads/upload.interface';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as FormData from 'form-data';

@Injectable()
export class ThumbSnapService implements UploadServiceInterface {
  constructor(private readonly httpService: HttpService) {}
  async upload(files: Express.Multer.File[]) {
    const requets = files.map(async (file) => {
      const formData = new FormData();
      formData.append('media', Buffer.from(file.buffer), file.originalname);
      formData.append('key', '0000286ca7a4d8aa8bbfb921a26673bb');
      const response = await this.httpService.axiosRef.post<ThumpSnapEntity>(
        'https://thumbsnap.com/api/upload',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );
      return response.data.data.media;
    });

    return await Promise.all(requets);
  }
}
