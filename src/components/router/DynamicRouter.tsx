
import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import routes from '@/routes/routes.json';

const loadComponent = (componentName: string) =>
  lazy(() => import(`@/pages/${componentName}.tsx`));

interface RouteConfig {
  path: string;
  component: string;
  protected: boolean;
}

export const DynamicRouter = ({ isAuthenticated = false }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {(routes.routes as RouteConfig[]).map(({ path, component, protected: isProtected }) => (
          <Route
            key={path}
            path={path}
            element={
              isProtected && !isAuthenticated ? (
                <Navigate to="/login" replace />
              ) : (
                <Suspense fallback={<div>Loading...</div>}>
                  {React.createElement(loadComponent(component))}
                </Suspense>
              )
            }
          />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};
