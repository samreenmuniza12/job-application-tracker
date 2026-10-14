import { useState } from "react";
import Button from "../ui/Button";

const inputClass = "mt-2 block min-h-11 w-full rounded-lg border border-slate-400 bg-white px-3 py-2 text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700";

export default function ApplicationForm({ onAddApplication }) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [appliedDate, setAppliedDate] = useState("");
  const [status, setStatus] = useState("Applied");

  function handleSubmit(event) {
    event.preventDefault();

    onAddApplication({
      company: company.trim(),
      role: role.trim(),
      appliedDate,
      status,
    });

    setCompany("");
    setRole("");
    setAppliedDate("");
    setStatus("Applied");
  }

  return (
    <form onSubmit={handleSubmit} aria-labelledby="add-application-heading" className="mt-5">
      <p className="text-sm text-slate-600">All fields are required.</p>
      <div className="mt-4 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="application-company" className="text-sm font-medium text-slate-900">Company</label>
          <input
            id="application-company" name="company" type="text"
            value={company} onChange={event => setCompany(event.target.value)}
            required maxLength={100} pattern=".*\S.*"
            title="Enter a company name, not only spaces."
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="application-role" className="text-sm font-medium text-slate-900">Role</label>
          <input
            id="application-role" name="role" type="text"
            value={role} onChange={event => setRole(event.target.value)}
            required maxLength={120} pattern=".*\S.*"
            title="Enter a role, not only spaces."
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="application-date" className="text-sm font-medium text-slate-900">Applied date</label>
          <input
            id="application-date" name="appliedDate" type="date"
            value={appliedDate} onChange={event => setAppliedDate(event.target.value)}
            required min="1900-01-01" max="9999-12-31"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="application-status" className="text-sm font-medium text-slate-900">Status</label>
          <select
            id="application-status" name="status"
            value={status} onChange={event => setStatus(event.target.value)}
            required className={inputClass}
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>
      <div className="mt-6">
        <Button type="submit">Save application</Button>
      </div>
    </form>
  );
}
