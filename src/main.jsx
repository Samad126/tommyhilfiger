import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './components/Root'
import Homepage from './pages/Homepage'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Homepage />
      },
    ]
  }
], {
  future: {
    v7_fetcherPersist: true,
    v7_relativeSplatPath: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true
  },
})

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}
    future={{
      v7_startTransition: true,
    }}
  />
)
