interface User {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  site_admin: boolean;
}

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex w-full items-center justify-between text-xs">
        <div className="flex items-center gap-1 rounded bg-gray-100 px-2 py-0.5 font-mono text-[11px] text-gray-600 dark:bg-zinc-800 dark:text-zinc-400">
          <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-zinc-500">
            ID
          </span>
          <span>{user.id}</span>
        </div>

        {user.site_admin && (
          <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700 dark:bg-zinc-800 dark:text-zinc-300">
            Admin
          </span>
        )}
      </div>

      <img 
        src={user.avatar_url} 
        alt={`${user.login}'s avatar`} 
        className="mt-3 h-16 w-16 rounded-full border border-gray-100 object-cover dark:border-zinc-800"
      />

      <h3 className="mt-3 text-base font-semibold text-gray-900 dark:text-zinc-100">
        {user.login}
      </h3>

      <a 
        href={user.html_url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="mt-5 flex w-full items-center justify-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 dark:hover:text-white"
      >
        <span>View Profile</span>
        <svg className="h-3.5 w-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  );
}