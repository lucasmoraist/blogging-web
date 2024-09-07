import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { Header } from './components/header';
import { useState } from 'react';
import { Footer } from './components/footer';

export function AppRoutes() {
    const [isLogged, setIsLogged] = useState(true);
    return <>
        <Router>
            <Header isLogged={isLogged} />
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
            <Footer />
        </Router>
    </>
}