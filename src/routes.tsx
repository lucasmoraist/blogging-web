import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { useState } from 'react';
import { PostDetails } from './pages/postDetails';
import { PageDefault } from './components/pageDefault';
import { NotFound } from './pages/notFound';

export function AppRoutes() {
  const [isLogged, setIsLogged] = useState(false);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<PageDefault isLogged={isLogged} />}>
            <Route index element={<Home />} />
            <Route path="post/:id" element={<PostDetails />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
