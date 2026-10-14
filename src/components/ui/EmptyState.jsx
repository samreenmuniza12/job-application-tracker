export default function EmptyState({ title, description, children }) {
  return (
    <div className="flex flex-col items-center px-5 py-14 text-center sm:py-20">
      <div
        aria-hidden="true"
        className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="4" y="6" width="16" height="15" rx="2" />
          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
          <path d="M8 11h8M8 15h5" />
        </svg>
      </div>

      <h3 className="text-xl font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
        {description}
      </p>

      {children && <div className="mt-6">{children}</div>}
    </div>
  )
}
