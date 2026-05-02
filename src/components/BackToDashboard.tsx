import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function BackToDashboard() {
  return (
    <Link
      to="/"
      className={[
        'inline-flex items-center gap-1.5 text-caption font-medium text-neutral-600',
        'hover:text-neutral-900 transition-colors duration-base',
      ].join(' ')}
    >
      <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
      All commodities
    </Link>
  );
}
