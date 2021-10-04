import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { createLogger } from "../../utils/logger";
import { deleteNote } from '../../businessLogic/notes'
import logStatements from "../../log-statements";
import { getUserId } from "../utils";
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const logger = createLogger(logStatements.delete.name);

    try {
      const userId = getUserId(event);
      const noteId = event.pathParameters.noteId
      logger.info(logStatements.delete.success, noteId);
      await deleteNote(noteId, userId);

      return {
        statusCode: 204,
        body: ""
      }
    } catch (error) {
      logger.error(logStatements.delete.error, error);

      return {
        statusCode: 500,
        body: logStatements.delete.error
      }
    }
  }
);

handler
  .use(httpErrorHandler())
  .use(cors({
    credentials: true
  }));
