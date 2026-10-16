import { describe, expect, it, vi } from "vitest";
import { loadApplications, saveApplications } from "./applicationStorage";

const key = "job-tracker-applications";

const application = {
  id: "test-1",
  company: "Example Company",
  role: "Frontend Developer",
  appliedDate: "2026-10-15",
  status: "Applied",
};

describe("application storage", () => {
  it("returns null when no saved list exists", () => {
    expect(loadApplications()).toBeNull();
  });

  it("loads a saved application with all its fields", () => {
    saveApplications([application]);

    expect(loadApplications()).toEqual([application]);
  });

  it("preserves an empty list after deleting the last application", () => {
    saveApplications([application]);
    saveApplications([]);

    expect(loadApplications()).toEqual([]);
  });

  it("rejects broken JSON", () => {
    localStorage.setItem(key, "{broken");

    expect(() => loadApplications()).toThrow();
  });

  it.each([
    ["an object instead of a list", {}],
    ["a null record", [null]],
    ["missing fields", [{ id: "test-1" }]],
    ["an unsupported status", [{ ...application, status: "Unknown" }]],
  ])("rejects %s", (_description, value) => {
    localStorage.setItem(key, JSON.stringify(value));

    expect(() => loadApplications()).toThrow(
      "Saved applications contain invalid data."
    );
  });

  it("reports a storage read failure to the caller", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("Storage blocked");
    });

    expect(() => loadApplications()).toThrow("Storage blocked");
  });

  it("reports a storage write failure to the caller", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("Storage full");
    });

    expect(() => saveApplications([application])).toThrow("Storage full");
  });
});
