import { Request, Response } from 'express';
import { ApiError } from './api-error.ts';
import { ApiResponseData } from './api-response-data.ts';
import { sendError } from './send-error.ts';
import { sendSuccess } from './send-success.ts';

export function apiHandler<TQuery, TData, TResponseData>(
    handler: (
        query: TQuery,
        data: TData,
    ) =>
        | Promise<ApiResponseData<TResponseData>>
        | ApiResponseData<TResponseData>,
    validate: (
        query: Request['query'],
        data: TData,
    ) => { data: TData; query: TQuery },
) {
    return async function (request: Request, response: Response) {
        const origin = request.get('origin');

        try {
            const { data, query } = validate(
                request.query,
                request.file ?? request.body,
            );
            const result = await handler(query, data);
            sendSuccess(origin, response, result);
        } catch (error) {
            console.log(error);

            if (error instanceof ApiError) {
                sendError(origin, response, error);
                return;
            }

            sendError(origin, response, new ApiError(500, 'Unknown error'));
        }
    };
}
