import * as uuid from "uuid";
import NoteAccess from "../../helpers/notesAccess";
import { CreateNoteRequest } from "../../requests/CreateNoteRequest";
import { UpdateNoteRequest } from "../../requests/UpdateNoteRequest";
import { NoteItem } from "../../models/NoteItem";

const noteAccess = new NoteAccess();

export const createNote = async (noteItem: CreateNoteRequest, userId: string): Promise<NoteItem> => {
  const requestMergedWithDefaults: NoteItem = {
    noteId: uuid.v4(),
    createdAt: new Date().toISOString(),
    attachmentUrl: noteItem.attachmentUrl || "",
    pinned: false,
    userId,
    ...noteItem,
  } as NoteItem;

  const saved = await noteAccess.create(requestMergedWithDefaults);

  return saved;
}

export const updateNote = async (noteId: string, noteItem: UpdateNoteRequest, userId: string): Promise<NoteItem> => {
  const updated = await noteAccess.update(noteId, noteItem as NoteItem, userId);
  return updated;
}

export const deleteNote = async (noteId: string, userId: string): Promise<string> => {
  await noteAccess.delete(noteId, userId);
  return noteId;
}

export const getNotesForUser = async (userId: string): Promise<NoteItem[]> => {
  const items = await noteAccess.findAll(userId);

  return items as NoteItem[];
}

export const getNote = async (userId: string, noteId: string): Promise<NoteItem> => {
  const item = await noteAccess.findOne(noteId, userId);
  return item as NoteItem;
}