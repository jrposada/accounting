import { Response } from 'express';
import { ApiError } from './api-error.ts';
import { getAccessControlAllowOrigin } from './cors.ts';

export function sendError<TError>(
    origin: string | undefined,
    response: Response,
    error: ApiError<TError>,
) {
    response
        .status(error.status)
        .header(
            'Access-Control-Allow-Origin',
            getAccessControlAllowOrigin(origin),
        )
        .send({
            success: false,
            error: error.message,
        });
}
