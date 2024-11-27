import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './components/Root'

import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import ErrorElement from './components/ErrorElement.jsx'
import Homepage from './pages/homepage/Homepage.jsx'
import Products from './pages/products/Products.jsx'
import SingleProduct from './pages/singleProduct/SingleProduct.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Homepage />
      },
      {
        path: "products",
        element: <Products />
      },
      {
        path: "items",
        element: <SingleProduct />
      },
    ]
  },
  {
    path: "*",
    element: <ErrorElement />
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
