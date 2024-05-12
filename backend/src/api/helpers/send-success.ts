import { Response } from 'express';
import { ApiResponseData } from './api-response-data.ts';
import { getAccessControlAllowOrigin } from './cors.ts';

export function sendSuccess<TData = unknown>(
    origin: string | undefined,
    response: Response,
    data: ApiResponseData<TData>,
) {
    response
        .status(data.status)
        .header(
            'Access-Control-Allow-Origin',
            getAccessControlAllowOrigin(origin),
        )
        .send({
            success: true,
            data: data.data,
        });
}
