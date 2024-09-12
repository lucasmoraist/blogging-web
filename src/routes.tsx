import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { PostDetails } from './pages/postDetails';
import { PageDefault } from './components/pageDefault';
import { NotFound } from './pages/notFound';
import { Register } from './pages/auth/register';
import { Login } from './pages/auth/login';

export function AppRoutes() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<PageDefault />}>
            <Route index element={<Home />} />
            <Route path="post/:postId" element={<PostDetails />} />
          </Route>
          <Route path='/register' element={<Register />}/>
          <Route path='/login' element={<Login />}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
