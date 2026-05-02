import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Pages will be mounted here in subsequent steps. */}
          <Route path="*" element={null} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
