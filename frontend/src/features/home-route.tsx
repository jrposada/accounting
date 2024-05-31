import { Button, Container, Grid } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { FunctionComponent, MouseEventHandler } from 'react';
import { useGenerateReport } from '../core/api/generate-report/generate-report';
import { t } from 'i18next';

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
                            xAxis={[
                                {
                                    data: data.data.map((item) => item.period),
                                    scaleType: 'band',
                                },
                            ]}
                            series={[
                                {
                                    data: data.data.map((item) => item.income),
                                    label: t('home.report.income'),
                                },
                                {
                                    data: data.data.map((item) => item.expense),
                                    label: t('home.report.expense'),
                                },
                                {
                                    data: data.data.map((item) => item.growth),
                                    label: t('home.report.growth'),
                                },
                            ].map((item) => ({
                                ...item,
                                highlightScope: {
                                    highlighted: 'series',
                                    faded: 'global',
                                },
                            }))}
                        />
                    )}
                </Grid>
            </Container>
        </Container>
    );
};

export default HomeRoute;
