import { Button, Container, Grid } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { FunctionComponent, MouseEventHandler } from 'react';
import { useGenerateReport } from '../core/api/generate-report/generate-report';

const HomeRoute: FunctionComponent = () => {
    const { data, mutate } = useGenerateReport();

    const generateReport: MouseEventHandler = () => {
        mutate({});
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
                gap: 1,
            }}
        >
            <Button
                onClick={generateReport}
                variant="contained"
                style={{ alignSelf: 'center' }}
            >
                Generate report
            </Button>
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
                    {data?.success && (
                        <BarChart
                            series={data.data.map((item) => ({
                                data: item.data,
                                label: item.period,
                            }))}
                        />
                    )}
                </Grid>
            </Container>
        </Container>
    );
};

export default HomeRoute;
