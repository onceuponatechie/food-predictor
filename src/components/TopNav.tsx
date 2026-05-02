import { Link, NavLink } from 'react-router-dom';
import { Search, Sprout } from 'lucide-react';

export function TopNav() {
  return (
    <header className="sticky top-0 z-30 bg-surface/85 backdrop-blur border-b border-neutral-200">
      <div className="mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 sm:gap-6 h-14 sm:h-16">
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0 text-neutral-900"
            aria-label="Food Forecast — home"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
              <Sprout className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden="true" />
            </span>
            <span className="font-semibold tracking-tight text-body-lg hidden xs:inline sm:inline">
              Food Forecast
            </span>
          </Link>

          <div className="flex-1 min-w-0">
            <SearchField />
          </div>

          <nav className="shrink-0">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                [
                  'inline-flex items-center rounded-md px-3 py-2 text-caption font-medium transition-colors duration-base',
                  isActive
                    ? 'text-neutral-900'
                    : 'text-neutral-600 hover:text-neutral-900',
                ].join(' ')
              }
            >
              About
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}

function SearchField() {
  return (
    <label
      className="group flex items-center gap-2 h-10 px-3 rounded-lg bg-neutral-100 border border-transparent focus-within:bg-surface focus-within:border-neutral-200 focus-within:shadow-focus transition-colors duration-base"
    >
      <Search
        className="h-4 w-4 text-neutral-500 shrink-0"
        strokeWidth={2}
        aria-hidden="true"
      />
      <input
        type="search"
        inputMode="search"
        placeholder="Search a food item, e.g. rice, tomatoes…"
        aria-label="Search food items"
        className="w-full bg-transparent border-0 outline-none text-body placeholder:text-neutral-500 text-neutral-900"
      />
    </label>
  );
}
