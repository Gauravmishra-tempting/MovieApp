import './App.css';
import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loader from './components/loader/Loader';


const Movie = lazy(() => import('./components/pages/movie'));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={< Movie />} />
      </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
