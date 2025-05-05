import { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { publicRoutes } from './routes/config/publicRoutes';
import PublicRouter from './routes/publicRouter';
import ProtectedRouter from './routes/protectedRouter';
import MainLayout from './components/layout/main-layout';
import { protectedRoutes } from './routes/config/protectedRoutes';
import NotFound from './pages/not-found';

function App() {
  return (
    <Suspense fallback={null}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/insurance-expert" replace />}
          />

          <Route element={<PublicRouter />}>
            {publicRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.component}
              />
            ))}
          </Route>
          <Route element={<ProtectedRouter />}>
            <Route element={<MainLayout />}>
              {protectedRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.component}
                />
              ))}
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
