export interface UploadServiceInterface {
  upload: (files: Express.Multer.File[]) => Promise<string[]>;
}
