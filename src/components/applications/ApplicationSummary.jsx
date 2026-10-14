const statuses = ["Applied", "Interview", "Offer", "Rejected"];

export default function ApplicationSummary({ applications }) {
  const summary = [
    { label: "Total", count: applications.length },
    ...statuses.map((status) => ({
      label: status,
      count: applications.filter((application) => application.status === status).length,
    })),
  ];

  return (
    <section aria-labelledby="summary-heading" className="mt-8">
      <h2 id="summary-heading" className="text-lg font-semibold text-slate-900">
        Application summary
      </h2>
      <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {summary.map(({ label, count }) => (
          <div key={label} className="rounded-xl border border-slate-200 bg-white p-4">
            <dt className="text-sm font-medium text-slate-600">{label}</dt>
            <dd className="mt-2 text-2xl font-bold text-slate-900">{count}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
