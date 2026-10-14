export default function Button({
  children,
  type = "button",
  disabled = false,
  onClick,
  describedBy,
  expanded,
  controls,
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-describedby={describedBy}
      aria-expanded={expanded}
      aria-controls={controls}
      className="inline-flex min-h-11 items-center justify-center rounded-lg bg-indigo-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-600"
    >
      {children}
    </button>
  );
}
