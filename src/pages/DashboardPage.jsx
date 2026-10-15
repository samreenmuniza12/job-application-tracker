import ApplicationForm from "../components/applications/ApplicationForm";
import { useState } from "react";
import Header from "../components/layout/Header";
import Button from "../components/ui/Button";
import ApplicationList from "../components/applications/ApplicationList";
import ApplicationSummary from "../components/applications/ApplicationSummary";
import { sampleApplications } from "../data/sampleApplications";
import {
  loadApplications,
  saveApplications,
} from "../services/applicationStorage";


export default function DashboardPage() {
    function getInitialStorage() {
      try {
        return {
          applications: loadApplications(),
          error: "",
        };
      } catch {
        return {
          applications: null,
          error: "Saved applications could not be loaded.",
        };
      }
    }  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [initialStorage] = useState(getInitialStorage);

  const [userApplications, setUserApplications] = useState(
    initialStorage.applications ?? []
  );

  const [storageError, setStorageError] = useState(
    initialStorage.error
  );
  const [editingApplication, setEditingApplication] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isDemo, setIsDemo] = useState(
     initialStorage.applications === null
    );
  const applications = isDemo ? sampleApplications : userApplications;
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const normalizedQuery = searchQuery.trim().toLowerCase();

const visibleApplications = applications
  .filter(application => {
    const matchesSearch =
      application.company.toLowerCase().includes(normalizedQuery) ||
      application.role.toLowerCase().includes(normalizedQuery);

    const matchesStatus =
      statusFilter === "all" || application.status === statusFilter;

    return matchesSearch && matchesStatus;
  })
  .sort((a, b) => {
    return sortOrder === "newest"
      ? b.appliedDate.localeCompare(a.appliedDate)
      : a.appliedDate.localeCompare(b.appliedDate);
  });

function handleCancelEditing() {
    setEditingApplication(null);
    setIsFormOpen(false);
  }

  function handleToggleForm() {
    setEditingApplication(null);
    setIsFormOpen(previous => !previous);
  }

  function handleEditApplication(application) {
    setEditingApplication(application);
    setIsFormOpen(true);
    setSuccessMessage("");
  }

  function persistApplications(nextApplications) {
    setUserApplications(nextApplications);
    setIsDemo(false);

    try {
      saveApplications(nextApplications);
      setStorageError("");
    } catch {
      setStorageError(
        "Changes could not be saved. They may be lost on refresh."
      );
    }
  }

  function handleUpdateApplication(values) {
    const nextApplications = userApplications.map(application =>
      application.id === editingApplication.id
        ? { ...application, ...values }
        : application
    );

    persistApplications(nextApplications);
    setSuccessMessage(`Updated ${values.role} at ${values.company}.`);
    handleCancelEditing();
  }

  function handleDeleteApplication(application) {
    const confirmed = window.confirm(
      `Delete ${application.role} at ${application.company}?`
    );

    if (!confirmed) return;

    if (editingApplication?.id === application.id) {
      handleCancelEditing();
    }

    const nextApplications = userApplications.filter(
      item => item.id !== application.id
    );

    persistApplications(nextApplications);
    setSuccessMessage(
      `Deleted ${application.role} at ${application.company}.`
    );
  }

  function handleAddApplication(values) {
    const newApplication = {
      ...values,
      id: crypto.randomUUID(),
    };

    const nextApplications = [newApplication, ...userApplications];

    persistApplications(nextApplications);
    setSuccessMessage(
      `Added ${values.role} at ${values.company}. Total applications: ${nextApplications.length}.`
    );
  }
  return (
    <div className="min-h-screen bg-slate-50">
      <a href="#main-content" className="sr-only rounded-md bg-white px-4 py-3 font-semibold text-indigo-700 focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50">
        Skip to main content
      </a>
      <Header />
      <main id="main-content" tabIndex={-1} className="focus:outline-2 focus:outline-offset-4 focus:outline-indigo-600 mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-indigo-700">YOUR JOB SEARCH</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Application dashboard</h1>
            <p className="mt-3 max-w-lg leading-7 text-slate-600">Organize your applications and follow each opportunity from application to outcome.</p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <Button
              onClick={handleToggleForm}
              expanded={isFormOpen}
              controls="add-application-section"
              describedBy="add-application-help"
            >
              {isFormOpen ? "Close form" : "Add application"}
            </Button>
            <p id="add-application-help" className="max-w-xs text-xs leading-5 text-slate-600">Your applications are saved in this browser when storage is available.</p>
          </div>
        </div>
        <p className="mt-6 rounded-xl border border-indigo-200 bg-indigo-50 p-4 text-sm leading-6 text-indigo-900">
          {isDemo ? (
            <><strong>Demo mode:</strong> These fictional records are examples. Adding your first application replaces them with your own list.</>
          ) : (
            <><strong>Your applications:</strong> Only your entries are shown. Changes are saved in this browser when storage is available.</>
          )}
        </p>
        <section
          id="add-application-section"
          hidden={!isFormOpen}
          aria-labelledby="add-application-heading"
          className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
        >
          <h2 id="add-application-heading" className="text-lg font-semibold text-slate-900">{editingApplication ? "Edit application" : "Add an application"}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Track the company, role, applied date and current status.</p>
          <ApplicationForm
            key={editingApplication?.id ?? "new"}
            application={editingApplication}
            onSaveApplication={editingApplication ? handleUpdateApplication : handleAddApplication}
            onCancel={handleCancelEditing}
          />
        </section>
        <p role="status" aria-atomic="true" className="mt-4 break-words text-sm font-medium text-emerald-800">
          {successMessage}
        </p>
        {storageError && (
          <p
            role="alert"
            className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-800"
          >
            {storageError}
          </p>
        )}
        <ApplicationSummary applications={applications} />
        <section aria-labelledby="applications-heading" className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
            <h2 id="applications-heading" className="text-lg font-semibold text-slate-900">{isDemo ? "Sample applications" : "Your applications"}</h2>
            <p className="mt-1 text-sm text-slate-600">{isDemo ? "Fictional examples for exploring the application list." : "Your personal application list."}</p>
          </div>
          {applications.length > 0 && visibleApplications.length === 0 ? (
            <p className="p-5 text-sm text-slate-600 sm:p-6">
              No matching applications. Try another company or job title.
            </p>
          ) : (
            <ApplicationList
              applications={visibleApplications}
              onDelete={isDemo ? undefined : handleDeleteApplication}
              onEdit={isDemo ? undefined : handleEditApplication}
            />
          )}          
            <div className="px-5 pt-5 sm:px-6">
              <label
                htmlFor="application-search"
                className="block text-sm font-medium text-slate-700"
              >
                Search applications
              </label>
              <input
                id="application-search"
                type="search"
                value={searchQuery}
                onChange={event => setSearchQuery(event.target.value)}
                placeholder="Search by company or job title"
                className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600"
               />
                <label
                  htmlFor="status-filter"
                  className="mt-4 block text-sm font-medium text-slate-700"
                >
                  Filter by status
                </label>
                <select
                  id="status-filter"
                  value={statusFilter}
                  onChange={event => setStatusFilter(event.target.value)}
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600"
                >
                  <option value="all">All statuses</option>
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <label
                  htmlFor="sort-order"
                  className="mt-4 block text-sm font-medium text-slate-700"
                >
                  Sort by applied date
                </label>
                <select
                  id="sort-order"
                  value={sortOrder}
                  onChange={event => setSortOrder(event.target.value)}
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600"
                >
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                </select>                
            </div>       
        </section>
        <p className="mt-4 text-sm leading-6 text-slate-600">Tip: keep the job description link handy when you apply.</p>
      </main>
      <footer className="mx-auto max-w-6xl px-4 pb-8 text-sm text-slate-600 sm:px-6">Built with React and Tailwind CSS.</footer>
    </div>
  );
}
