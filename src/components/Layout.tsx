import { Outlet } from 'react-router-dom';
import { TopNav } from './TopNav';

export function Layout() {
  return (
    <div className="min-h-full flex flex-col bg-canvas">
      <TopNav />
      <main className="flex-1 w-full">
        <div className="mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <Outlet />
        </div>
      </main>
      <footer className="border-t border-neutral-200 bg-surface">
        <div className="mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8 py-6 text-caption text-neutral-500">
          Food Forecast — public price guidance for everyday Nigerian consumers.
        </div>
      </footer>
    </div>
  );
}
