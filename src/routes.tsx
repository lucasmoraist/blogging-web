import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { Header } from './components/header';
import { useState } from 'react';
import { Footer } from './components/footer';
import { PostDetails } from './pages/postDetails';

export function AppRoutes() {
    const [isLogged, setIsLogged] = useState(false);
    return <>
        <Router>
            <Header isLogged={isLogged} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/post/:id' element={<PostDetails />}/>
            </Routes>
            <Footer />
        </Router>
    </>
}