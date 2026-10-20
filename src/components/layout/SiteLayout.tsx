import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function SiteLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-canvas pt-14">
      <Navbar />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>);

}