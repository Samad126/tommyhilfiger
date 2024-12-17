import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './components/Root'

import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import ErrorElement from './components/ErrorElement.jsx'
import Homepage from './pages/homepage/Homepage.jsx'
import Products from './pages/products/Products.jsx'
import SingleProduct from './pages/singleProduct/SingleProduct.jsx'
import store from './redux/store.js'
import { Provider } from 'react-redux'
// import { loader as prodLoader } from './productLoader.js'
import Search from './pages/search/Search.jsx'
import Cart from "./pages/cart/Cart.jsx"
import CheckoutPage from './pages/checkout/Checkout.jsx'

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
        children: [
          {
            path: "all",
            element: <Products />
          },
          {
            path: "details/:id",
            element: <SingleProduct />
          },
        ]
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/checkout",
        element: <CheckoutPage />
      },
      // {
      //   path: "/search/:key",
      //   element: <Search />
      // },
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
  <Provider store={store}>
    <RouterProvider router={router}
      future={{
        v7_startTransition: true,
      }}
    />
  </Provider>
)
