import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import SpotsGrid from './components/SpotsGrid';
import SpotDetails from './components/SpotDetails';
import SpotForm from './components/SpotForm';
import Unauthorized from './components/Unauthorized';
import * as sessionActions from './store/session';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <SpotsGrid/>
      },
      {
        path: '/spots/:spotId',
        element: <SpotDetails/>
      },
      {
        path: '/spots/:spotId/edit',
        element: <SpotForm edit={true}/>
      },
      {
        path: '/spots/current',
        element: <SpotsGrid filterOwned={true}/>
      },
      {
        path: '/spots/new',
        element: <SpotForm/>
      },
      {
        path: '/unauthorized',
        element: <Unauthorized/>
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
