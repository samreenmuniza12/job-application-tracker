import StatusBadge from "../ui/StatusBadge";

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric", month: "short", year: "numeric", timeZone: "UTC",
});

export default function ApplicationCard({ application, onDelete, onEdit }) {
  const { company, role, appliedDate, status } = application;
  const formattedDate = dateFormatter.format(new Date(`${appliedDate}T00:00:00Z`));

  return (
    <article className="h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="break-words text-sm font-medium text-slate-600">{company}</p>
      <h3 className="mt-2 break-words text-lg font-semibold text-slate-900">{role}</h3>
      <div className="mt-4"><StatusBadge status={status} /></div>
      <p className="mt-4 text-sm text-slate-600">
        Applied on <time dateTime={appliedDate}>{formattedDate}</time>
      </p>
      {onEdit && (
        <div className="mt-5">
          <button
            type="button"
            onClick={() => onEdit(application)}
            aria-label={`Edit ${role} at ${company}`}
            className="min-h-11 rounded-lg border border-indigo-300 px-4 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700"
          >
            Edit
          </button>
        </div>
      )}
      {onDelete && (
        <div className="mt-5">
          <button
            type="button"
            onClick={() => onDelete(application)}
            aria-label={`Delete ${role} at ${company}`}
            className="min-h-11 rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
          >
            Delete
          </button>
        </div>
      )}
    </article>
  );
}
