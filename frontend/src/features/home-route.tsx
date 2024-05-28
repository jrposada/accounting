import { Container } from '@mui/material';
import { FunctionComponent } from 'react';

const HomeRoute: FunctionComponent = () => {
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
            <h1>Home</h1>
        </Container>
    );
};

export default HomeRoute;
