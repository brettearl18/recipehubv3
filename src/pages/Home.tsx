import { useNavigate } from 'react-router-dom';
import { ShieldCheckIcon, UsersIcon, UserIcon } from '@heroicons/react/24/solid';

const accessPoints = [
  {
    label: 'Recipe HUB Admin',
    description: 'Full management access to users, recipes, analytics, and settings.',
    route: '/admin',
    color: 'from-red-500 to-red-700',
    icon: ShieldCheckIcon,
    border: 'border-red-200',
  },
  {
    label: 'Coach Access',
    description: 'Manage assigned clients, view analytics, and assign meal plans.',
    route: '/coach',
    color: 'from-blue-500 to-blue-700',
    icon: UsersIcon,
    border: 'border-blue-200',
  },
  {
    label: 'Client Access',
    description: 'Personal meal planning, macro tracking, and shopping lists.',
    route: '/client',
    color: 'from-green-500 to-green-700',
    icon: UserIcon,
    border: 'border-green-200',
  },
];

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-2 tracking-tight drop-shadow-sm">RecipeHUB</h1>
        <p className="text-lg text-gray-600 font-medium mb-2">Your all-in-one fitness, health, and nutrition meal planning platform</p>
        <span className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-semibold tracking-wide shadow-sm">Choose your access point</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {accessPoints.map((ap) => {
          const Icon = ap.icon;
          return (
            <button
              key={ap.label}
              onClick={() => navigate(ap.route)}
              className={`group relative rounded-2xl border ${ap.border} bg-white shadow-lg hover:shadow-2xl transition-all duration-200 p-8 flex flex-col items-center focus:outline-none focus:ring-4 focus:ring-primary-300`}
              style={{ minHeight: 320 }}
            >
              <span className={`absolute -top-8 left-1/2 -translate-x-1/2 bg-gradient-to-br ${ap.color} p-4 rounded-full shadow-lg`}>
                <Icon className="h-10 w-10 text-white" />
              </span>
              <div className="mt-8 mb-4 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition">{ap.label}</h2>
                <p className="text-gray-600 text-base font-medium mb-4">{ap.description}</p>
              </div>
              <span className={`mt-auto w-full py-2 px-4 rounded-lg bg-gradient-to-r ${ap.color} text-white font-semibold text-lg shadow group-hover:scale-105 group-hover:shadow-xl transition`}>Enter</span>
            </button>
          );
        })}
      </div>
      <footer className="mt-16 text-gray-400 text-xs text-center">
        &copy; {new Date().getFullYear()} RecipeHUB. All rights reserved.
      </footer>
    </div>
  );
} 