import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import DashboardPage from "./DashboardPage";
import {
  loadApplications,
  saveApplications,
} from "../services/applicationStorage";

const applications = [
  {
    id: "filter-1",
    company: "Alpha Company",
    role: "Frontend Developer",
    appliedDate: "2026-10-10",
    status: "Applied",
  },
  {
    id: "filter-2",
    company: "Beta Company",
    role: "React Developer",
    appliedDate: "2026-10-15",
    status: "Interview",
  },
  {
    id: "filter-3",
    company: "Gamma Company",
    role: "UI Engineer",
    appliedDate: "2026-10-12",
    status: "Offer",
  },
];

function visibleRoles() {
  return screen.queryAllByRole("heading", { level: 3 })
    .map(heading => heading.textContent);
}

it("searches company and role, combines status filtering, and recovers from no matches", async () => {
  saveApplications(applications);
  const user = userEvent.setup();
  render(<DashboardPage />);

  const search = screen.getByRole("searchbox", {
    name: "Search applications",
  });
  const filter = screen.getByLabelText("Filter by status");

  await user.type(search, "  ALPHA  ");
  expect(visibleRoles()).toEqual(["Frontend Developer"]);

  await user.clear(search);
  await user.type(search, "developer");
  expect(visibleRoles()).toEqual([
    "React Developer",
    "Frontend Developer",
  ]);

  await user.selectOptions(filter, "Interview");
  expect(visibleRoles()).toEqual(["React Developer"]);

  await user.selectOptions(filter, "Offer");
  expect(visibleRoles()).toEqual([]);
  expect(
    screen.getByText(/No matching applications/)
  ).toBeInTheDocument();

  await user.clear(search);
  expect(visibleRoles()).toEqual(["UI Engineer"]);

  await user.selectOptions(filter, "all");
  expect(visibleRoles()).toHaveLength(3);
  expect(loadApplications()).toEqual(applications);
});

it("sorts dates in both directions without changing the saved list", async () => {
  saveApplications(applications);
  const user = userEvent.setup();
  render(<DashboardPage />);

  expect(visibleRoles()).toEqual([
    "React Developer",
    "UI Engineer",
    "Frontend Developer",
  ]);

  const sort = screen.getByLabelText("Sort by applied date");
  await user.selectOptions(sort, "oldest");

  expect(visibleRoles()).toEqual([
    "Frontend Developer",
    "UI Engineer",
    "React Developer",
  ]);

  await user.selectOptions(sort, "newest");

  expect(visibleRoles()).toEqual([
    "React Developer",
    "UI Engineer",
    "Frontend Developer",
  ]);
  expect(loadApplications()).toEqual(applications);
});
