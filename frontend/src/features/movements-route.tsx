import { Button, Container } from '@mui/material';
import {
    ChangeEventHandler,
    FunctionComponent,
    MouseEventHandler,
    useState,
} from 'react';
import { Arguments } from 'shared/utils/arguments';
import { useGetMovements } from '../core/api/get-movements/get-movements';
import { usePostStatements } from '../core/api/post-statements/post-statements';
import MovementsTable, {
    MovementsTableProps,
} from '../ui/movements/movements-table/movements-table';

const MovementsRoute: FunctionComponent = () => {
    const [filter, setFilter] = useState<
        Arguments<typeof useGetMovements>['0']['filter']
    >({ ability: {} });

    const { data } = useGetMovements({ filter });

    const handleFilterChange: MovementsTableProps['onFilterChange'] = (
        filter,
    ) => {
        setFilter(filter);
    };

    // Import start
    const { mutate: postStatements } = usePostStatements();
    const [file, setFile] = useState<File | null>(null);

    const onFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const onFileUpload: MouseEventHandler = () => {
        if (!file) {
            return;
        }

        postStatements({ file });
    };
    // Import end

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
            <h1>File Upload</h1>
            <input type="file" onChange={onFileChange} />
            <Button onClick={onFileUpload}>Upload</Button>
            <MovementsTable data={data} onFilterChange={handleFilterChange} />
        </Container>
    );
};

export default MovementsRoute;
