import Header from "../components/layout/Header";
import Button from "../components/ui/Button";
import ApplicationList from "../components/applications/ApplicationList";
import ApplicationSummary from "../components/applications/ApplicationSummary";
import { sampleApplications } from "../data/sampleApplications";

export default function DashboardPage() {
  const applications = sampleApplications;

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
            <Button disabled describedBy="add-application-help">Add application</Button>
            <p id="add-application-help" className="max-w-xs text-xs leading-5 text-slate-600">Adding applications will be available in Module 3.</p>
          </div>
        </div>
        <p className="mt-6 rounded-xl border border-indigo-200 bg-indigo-50 p-4 text-sm leading-6 text-indigo-900">
          <strong>Demo mode:</strong> These fictional records show how RoleTrail works. They are not your real applications. Nothing is saved yet.
        </p>
        <ApplicationSummary applications={applications} />
        <section aria-labelledby="applications-heading" className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
            <h2 id="applications-heading" className="text-lg font-semibold text-slate-900">Sample applications</h2>
            <p className="mt-1 text-sm text-slate-600">Fictional examples for exploring the application list.</p>
          </div>
          <ApplicationList applications={applications} />
        </section>
        <p className="mt-4 text-sm leading-6 text-slate-600">Tip: keep the job description link handy when you apply.</p>
      </main>
      <footer className="mx-auto max-w-6xl px-4 pb-8 text-sm text-slate-600 sm:px-6">Built with React and Tailwind CSS.</footer>
    </div>
  );
}
