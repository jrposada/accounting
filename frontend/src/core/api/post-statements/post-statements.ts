import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { ApiResponse } from 'shared/models/api-response';

export type UsePostStatementsParams = {
    file: File;
};

export const usePostStatements: () => UseMutationResult<
    ApiResponse,
    Error,
    UsePostStatementsParams
> = () =>
    useMutation({
        mutationFn: async ({ file }) => {
            const formData = new FormData();
            formData.append('file', file);

            const response: ApiResponse = await (
                await fetch(`${import.meta.env.VITE_API_BASE_URL}/statements`, {
                    method: 'POST',
                    body: formData,
                })
            ).json();

            return response;
        },
    });
