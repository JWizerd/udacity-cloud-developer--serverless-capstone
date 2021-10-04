import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { UpdateNoteRequest } from '../../requests/UpdateNoteRequest';
import { updateNote } from '../../businessLogic/notes'
import logStatements from '../../log-statements';
import { createLogger } from "../../utils/logger";
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'
import { getUserId } from "../utils";

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const logger = createLogger(logStatements.update.name);
    try {
      const userId = getUserId(event);
      const noteId = event.pathParameters.noteId;
      const updatedTodo: UpdateNoteRequest = JSON.parse(event.body);
      const result = await updateNote(noteId, updatedTodo, userId);
      logger.info(logStatements.update.success, result);

      return {
        statusCode: 200,
        body: JSON.stringify(result)
      }
    } catch (error) {
      logger.error(logStatements.update.error, error);

      return {
        statusCode: 500,
        body: logStatements.update.error
      }
    }
  }
);

handler
  .use(httpErrorHandler())
  .use(cors({
    credentials: true
  }))

