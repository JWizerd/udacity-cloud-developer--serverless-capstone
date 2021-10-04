import { AttachmentsAccess } from "../../helpers/attachmentUtils";

const attachmentsAccess = new AttachmentsAccess();
export const createAttachmentPresignedUrl = (noteId: string) => {
  return attachmentsAccess.getUploadUrl(noteId);
}


