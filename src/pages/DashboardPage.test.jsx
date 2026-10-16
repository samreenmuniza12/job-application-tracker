import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import DashboardPage from "./DashboardPage";
import {
  loadApplications,
  saveApplications,
} from "../services/applicationStorage";

const application = {
  id: "dashboard-test-1",
  company: "Example Company",
  role: "Frontend Developer",
  appliedDate: "2026-10-15",
  status: "Applied",
};

function getApplicationCard(role) {
  return screen.getByRole("heading", {
    level: 3,
    name: role,
  }).closest("article");
}

describe("dashboard application management", () => {
  it("replaces demo records with an added application and restores it after remount", async () => {
    const user = userEvent.setup();
    const view = render(<DashboardPage />);

    expect(screen.getByText(/Demo mode:/)).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "Add application" })
    );
    await user.type(screen.getByLabelText("Company"), "Example Company");
    await user.type(screen.getByLabelText("Role"), "Frontend Developer");
    fireEvent.change(screen.getByLabelText("Applied date"), {
      target: { value: "2026-10-15" },
    });
    await user.click(
      screen.getByRole("button", { name: "Save application" })
    );

    expect(screen.queryByText(/Demo mode:/)).not.toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(1);
    expect(loadApplications()).toEqual([
      expect.objectContaining({
        company: "Example Company",
        role: "Frontend Developer",
        appliedDate: "2026-10-15",
        status: "Applied",
        id: expect.any(String),
      }),
    ]);

    view.unmount();
    render(<DashboardPage />);

    expect(getApplicationCard("Frontend Developer")).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(1);
  });

  it("edits an application without changing its identity or adding a duplicate", async () => {
    saveApplications([application]);
    const user = userEvent.setup();
    render(<DashboardPage />);

    await user.click(
      screen.getByRole("button", {
        name: "Edit Frontend Developer at Example Company",
      })
    );
    expect(screen.getByLabelText("Role")).toHaveValue("Frontend Developer");

    await user.clear(screen.getByLabelText("Role"));
    await user.type(screen.getByLabelText("Role"), "React Developer");
    await user.selectOptions(screen.getByLabelText("Status"), "Interview");
    await user.click(
      screen.getByRole("button", { name: "Save changes" })
    );

    const card = getApplicationCard("React Developer");
    expect(within(card).getByText("Interview")).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { level: 3, name: "Frontend Developer" })
    ).not.toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(1);
    expect(loadApplications()).toEqual([
      { ...application, role: "React Developer", status: "Interview" },
    ]);
  });

  it("keeps a cancelled deletion and persists a confirmed deletion after remount", async () => {
    saveApplications([application]);
    const user = userEvent.setup();
    const confirm = vi.spyOn(window, "confirm").mockReturnValue(false);
    const view = render(<DashboardPage />);

    const deleteButton = screen.getByRole("button", {
      name: "Delete Frontend Developer at Example Company",
    });

    await user.click(deleteButton);

    expect(confirm).toHaveBeenCalledWith(
      "Delete Frontend Developer at Example Company?"
    );
    expect(getApplicationCard("Frontend Developer")).toBeInTheDocument();
    expect(loadApplications()).toEqual([application]);

    confirm.mockReturnValue(true);
    await user.click(deleteButton);

    expect(screen.queryAllByRole("article")).toHaveLength(0);
    expect(loadApplications()).toEqual([]);

    view.unmount();
    render(<DashboardPage />);

    expect(screen.queryAllByRole("article")).toHaveLength(0);
    expect(screen.queryByText(/Demo mode:/)).not.toBeInTheDocument();
  });
});
