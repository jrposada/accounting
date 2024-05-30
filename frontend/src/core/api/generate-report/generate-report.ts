import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { ApiResponse } from 'shared/models/api-response';
import { Report } from 'shared/models/report';

export type UseGenerateReportParams = {};

export const useGenerateReport: () => UseMutationResult<
    ApiResponse<Report>,
    Error,
    UseGenerateReportParams
> = () =>
    useMutation({
        mutationFn: async () => {
            const response: ApiResponse<Report> = await (
                await fetch(
                    `${import.meta.env.VITE_API_BASE_URL}/report/generate`,
                    {
                        method: 'POST',
                    },
                )
            ).json();

            return response;
        },
    });
