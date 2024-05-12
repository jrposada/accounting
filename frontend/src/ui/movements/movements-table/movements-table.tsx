import { Container, Grid } from '@mui/material';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import { t } from 'i18next';
import { FunctionComponent, useMemo, useState } from 'react';
import { Movement } from 'shared/models/movement';

type MovementsTableProps = {
    data: Movement[] | undefined;
    onFilterChange: (filter: {}) => void;
};

const MovementsTable: FunctionComponent<MovementsTableProps> = ({ data }) => {
    const components = useMemo(() => ({}), []);

    const [colDefs] = useState<AgGridReactProps<Movement>['columnDefs']>([]);

    const autoSizeStrategy: AgGridReactProps<Movement>['autoSizeStrategy'] = {
        type: 'fitCellContents',
    };

    const [context] = useState({ t });

    return (
        <Container
            maxWidth={false}
            sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
            }}
        >
            <Grid item sx={{ flexGrow: 1 }}>
                <div className="ag-theme-quartz" style={{ height: '100%' }}>
                    <AgGridReact<Movement>
                        autoSizeStrategy={autoSizeStrategy}
                        columnDefs={colDefs}
                        components={components}
                        context={context}
                        rowData={data}
                    />
                </div>
            </Grid>
        </Container>
    );
};

export default MovementsTable;
export type { MovementsTableProps };
