import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { ApiResponse } from 'shared/models/api-response';
import { Movement } from 'shared/models/movement';
import { Query } from 'shared/models/query';

export type UseGetMovementsParams = {
    filter: {};
};

export const useGetMovements: (
    params: UseGetMovementsParams,
) => UseQueryResult<Movement[], Error> = (params) =>
    useQuery({
        queryKey: ['movements', { ...params }],
        queryFn: async () => {
            const query = new Query();

            // Object.entries(params.filter.ability)
            //     .filter(([_, value]) => value)
            //     .forEach(
            //         ([ability]) => void query.filter(`abilities.${ability}`),
            //     );

            const response: ApiResponse<Movement[]> = await (
                await fetch(
                    `${import.meta.env.VITE_API_BASE_URL}/movements${query}`,
                )
            ).json();

            return response.data ?? [];
        },
    });
