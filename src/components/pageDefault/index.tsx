import { Outlet } from 'react-router-dom';
import Header from '../header';
import Footer from '../footer';
import { memo } from 'react';

function PageDefault() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '100vh',
      }}
    >
      <Header />

      <Outlet />

      <Footer />
    </div>
  );
}

export default memo(PageDefault);