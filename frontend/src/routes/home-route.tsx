import { Container } from '@mui/material';
import { FunctionComponent, useState } from 'react';
import { Arguments } from 'shared/utils/arguments';
import { useGetMovements } from '../core/api/get-movements/get-movements';
import MovementsTable, {
    MovementsTableProps,
} from '../ui/movements/movements-table/movements-table';

const HomeRoute: FunctionComponent = () => {
    const [filter, setFilter] = useState<
        Arguments<typeof useGetMovements>['0']['filter']
    >({ ability: {} });

    const { data } = useGetMovements({ filter });

    const handleFilterChange: MovementsTableProps['onFilterChange'] = (
        filter,
    ) => {
        setFilter(filter);
    };

    return (
        <Container
            maxWidth={false}
            sx={{
                mt: 4,
                mb: 4,
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <MovementsTable data={data} onFilterChange={handleFilterChange} />
        </Container>
    );
};

export default HomeRoute;
