import './App.css';
import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loader from './components/loader/Loader';



const MovieApp = lazy(() => import('./components/pages/MovieApp'))

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={< MovieApp />} />
      </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
