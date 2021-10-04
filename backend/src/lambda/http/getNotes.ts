import 'source-map-support/register';
import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';
import { createLogger } from "../../utils/logger";
import { getNotesForUser } from '../../businessLogic/notes'
import logStatements from '../../log-statements';
import { getUserId } from '../utils';
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const logger = createLogger(logStatements.findAll.name);
    try {
      logger.info(logStatements.findAll.success, event);
      const userId = getUserId(event);
      const notes = await getNotesForUser(userId);

      return {
        statusCode: 200,
        body: JSON.stringify({ items: notes })
      }
    } catch (error) {
      logger.error(logStatements.findAll.error, error);

      return {
        statusCode: 500,
        body: logStatements.findAll.error
      }
    }
  }
);

handler
  .use(httpErrorHandler())
  .use(cors({
    credentials: true
  }))
