import { createRoute } from '@tanstack/react-router';
import HomeRoute from './features/home-route';
import MovementsRoute from './features/movements-route';
import { rootRoute } from './root-route';

const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: HomeRoute,
});

const movementsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/movements',
    component: MovementsRoute,
});

export const routes = [homeRoute, movementsRoute];
