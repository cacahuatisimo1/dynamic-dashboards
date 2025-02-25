
import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import routes from '@/routes/routes.json';

const loadComponent = (componentName: string) =>
  lazy(() => import(`@/pages/${componentName}.tsx`));

interface RouteConfig {
  path: string;
  component: string;
  title: string;
  requiresAuth: boolean;
  icon?: string;
  children?: RouteConfig[];
}

export const DynamicRouter = ({ isAuthenticated = false }) => {
  const renderRoutes = (routes: RouteConfig[]) => {
    return routes.map((route) => {
      const Component = loadComponent(route.component);

      if (route.children) {
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              route.requiresAuth && !isAuthenticated ? (
                <Navigate to="/" replace />
              ) : (
                <Suspense fallback={<div>Loading...</div>}>
                  <Component />
                </Suspense>
              )
            }
          >
            {renderRoutes(route.children)}
          </Route>
        );
      }

      return (
        <Route
          key={route.path}
          path={route.path}
          element={
            route.requiresAuth && !isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <Suspense fallback={<div>Loading...</div>}>
                <Component />
              </Suspense>
            )
          }
        />
      );
    });
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {renderRoutes(routes.routes as RouteConfig[])}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};
