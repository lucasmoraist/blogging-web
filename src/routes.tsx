import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { PostDetails } from './pages/postDetails';
import PageDefault from './components/pageDefault';
import { NotFound } from './pages/notFound';
import { Register } from './pages/auth/register';
import { Login } from './pages/auth/login';
import { PrivateRoute } from './utils/privateRoute';
import { ListPosts } from './pages/listPosts';
import { FormPost } from './pages/createPost';

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageDefault />}>
          <Route index element={<Home />} />
          <Route path="post/:postId" element={<PostDetails />} />

          <Route element={<PrivateRoute />}>
            <Route path="/admin/posts" element={<ListPosts />} />
            <Route path="/admin/create" element={<FormPost />} />
            <Route path="/admin/update/:id" element={<FormPost />} />
          </Route>
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
