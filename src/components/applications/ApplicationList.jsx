import ApplicationCard from "./ApplicationCard";
import EmptyState from "../ui/EmptyState";

export default function ApplicationList({ applications }) {
  if (applications.length === 0) {
    return (
      <EmptyState
        title="No applications to display"
        description="This list is empty. Use Add application to create an entry."
      />
    );
  }

  return (
    <ul className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-3">
      {applications.map((application) => (
        <li key={application.id} className="min-w-0">
          <ApplicationCard application={application} />
        </li>
      ))}
    </ul>
  );
}
