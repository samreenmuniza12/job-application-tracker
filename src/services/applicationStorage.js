const STORAGE_KEY = "job-tracker-applications";

const VALID_STATUSES = [
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
];

function isValidApplication(application) {
  if (!application || typeof application !== "object") {
    return false;
  }

  return (
    typeof application.id === "string" &&
    typeof application.company === "string" &&
    typeof application.role === "string" &&
    typeof application.appliedDate === "string" &&
    VALID_STATUSES.includes(application.status)
  );
}

export function loadApplications() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved === null) {
    return null;
  }

  const applications = JSON.parse(saved);

  if (
    !Array.isArray(applications) ||
    !applications.every(isValidApplication)
  ) {
    throw new Error("Saved applications contain invalid data.");
  }

  return applications;
}

export function saveApplications(applications) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(applications)
  );
}