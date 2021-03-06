export interface NoteItem {
  userId: string
  noteId: string
  createdAt: string
  updatedAt: string
  title: string
  description: string
  pinned: boolean
  attachmentUrl?: string
}
