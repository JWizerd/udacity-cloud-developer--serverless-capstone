import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { createDynamoDBClient } from '../utils/dynamo-db-get-client';
import { NoteItem } from "../models/NoteItem";

export default class NoteAccess {
  constructor(
    private readonly client: DocumentClient = createDynamoDBClient(),
    private readonly table: string = process.env.NOTES_TABLE
  ) { }

  async findAll(userId: string): Promise<NoteItem[]> {
    var params: DocumentClient.QueryInput = {
      ExpressionAttributeValues: {
        ':userId': userId
      },
      IndexName: process.env.NOTE_LOCAL_SECONDARY_INDEX_NAME,
      KeyConditionExpression: 'userId = :userId',
      TableName: this.table
    };

    const result = await this.client.query(params).promise();

    return result.Items as NoteItem[];
  }

  async create(NoteItem: NoteItem): Promise<NoteItem> {
    await this.client.put({
      TableName: this.table,
      Item: NoteItem
    }).promise();

    return NoteItem as NoteItem;
  }

  async delete(noteId: string, userId: string): Promise<string> {
    await this.client.delete({
      TableName: this.table,
      Key: {
        noteId,
        userId
      }
    }).promise();

    return noteId;
  }

  async findOne(noteId: string, userId: string): Promise<NoteItem> {
    const note = await this.client.get({
      TableName: this.table,
      Key: {
        noteId,
        userId
      }
    }).promise();

    return note.Item as NoteItem;
  }

  async update(noteId: string, NoteItem: NoteItem, userId: string): Promise<NoteItem> {
    await this.client.update({
      TableName: this.table,
      Key: {
        noteId,
        userId,
      },
      UpdateExpression: "set title = :a, description = :b, pinned = :c, attachmentUrl = :d",
      ExpressionAttributeValues: {
        ":a": NoteItem.title,
        ":b": NoteItem.description,
        ":c": NoteItem.pinned,
        ":d": NoteItem.attachmentUrl,
      },
      ReturnValues: "ALL_NEW"
    }).promise();

    return NoteItem as NoteItem;
  }
}