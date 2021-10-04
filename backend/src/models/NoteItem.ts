export interface NoteItem {
  userId: string
  noteId: string
  createdAt: string
  updatedAt: string
  title: string
  description: string
  labels: number[]
  pinned: boolean
  attachmentUrl?: string
}
