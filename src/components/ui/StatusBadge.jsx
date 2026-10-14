const statusStyles = {
  Applied: "bg-blue-50 text-blue-800 ring-blue-200",
  Interview: "bg-amber-50 text-amber-800 ring-amber-200",
  Offer: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  Rejected: "bg-rose-50 text-rose-800 ring-rose-200",
};

export default function StatusBadge({ status }) {
  const styles = statusStyles[status] ?? "bg-slate-100 text-slate-800 ring-slate-200";

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${styles}`}>
      {status}
    </span>
  );
}
