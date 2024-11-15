import './css/reset.css';
import './css/style.css';
import Layout from '@/layout/Layout';
import { HashRouter, Route, Routes } from 'react-router-dom';
import ErrorBoundaryWrapper from '@/components/error-boundary/ErrorBoundary';
import Products from '@/pages/product/Products';
import ProductDetail from '@/pages/product-detail/ProductDetail';
import ErrorPage from '@/pages/error/ErrorPage';
import NotFound from '@/pages/error/NotFound';
import Cart from '@/pages/cart/Cart';

export default function App() {
  return (
    <HashRouter>
      <ErrorBoundaryWrapper>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundaryWrapper>
    </HashRouter>
  );
}
