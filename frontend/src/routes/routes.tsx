import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '../root-route';
import HomeRoute from './home-route';

const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: HomeRoute,
});

const aboutRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/about',
    component: function About() {
        return <div className="p-2">Hello from About!</div>;
    },
});

export const routes = [homeRoute, aboutRoute];
