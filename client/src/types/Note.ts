export interface Note {
  noteId: string
  createdAt: string
  title: string
  description: string
  pinned?: boolean
  attachmentUrl?: string
}
