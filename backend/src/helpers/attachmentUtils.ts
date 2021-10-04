
import * as S3 from "aws-sdk/clients/s3";
import { getS3Client } from "../utils/s3-get-client";;

export class AttachmentsAccess {
  constructor(
    private readonly s3: S3 = getS3Client(),
    private readonly bucketName: string = process.env.TODO_ATTACHMENTS_S3_BUCKET,
    private readonly urlExpiration: number = parseInt(process.env.SIGNED_URL_EXPIRATION, 10)
  ) { }

  getUploadUrl(noteId: string) {
    return this.s3.getSignedUrl('putObject', {
      Bucket: this.bucketName,
      Key: noteId,
      Expires: this.urlExpiration
    });
  }

  async delete(noteId: string) {
    return this.s3.deleteObject({
      Key: noteId,
      Bucket: this.bucketName
    }).promise();
  }
}