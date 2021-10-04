export interface CreateNoteRequest {
  title: string
  description: string
  attachmentUrl?: string
  pinned?: boolean
}
