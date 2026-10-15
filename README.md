# RoleTrail

A beginner React portfolio project for organizing job applications.

## Current progress
Modules 1-4: responsive UI, application listing, adding, editing, and deleting applications.

- Reusable application form, cards, status badges, list, and summary
- Four clearly labelled fictional demo records
- Controlled inputs for company, role, applied date, and status
- Required-field validation and whitespace-only company/role checks
- Stable IDs generated when personal records are created
- Edit existing applications with prefilled fields and Save changes / Cancel
- Delete personal applications after confirmation
- Deleting the last personal entry shows an empty state
- Immutable application updates and summary counts derived from records
- Success feedback, accessible labels, and keyboard focus styles
- Responsive layout, empty state, and keyboard skip navigation

## Demo and personal entries
The dashboard initially displays four fictional demo records.
Adding the first personal application replaces the demos with a personal list.
Further entries are added to that personal list.
Closing and reopening the add form preserves an unfinished add draft.
Editing loads the selected record; switching records loads the correct details.
Cancel discards unsaved edits. Saving updates the existing record without changing its ID.
Demo records have no edit/delete actions.
Deleting all personal records keeps the personal list empty until refresh.

## Limitations
Entries exist only in React memory and are lost when the page refreshes.
Refreshing restores the fictional demo records.
Search/filter/sort and localStorage persistence are planned.
There is no backend or authentication.

## Stack
React, JavaScript, Vite, Tailwind CSS, and ESLint.
Development environment: Node.js 22.20.0.

## Run locally
Install locked dependencies in PowerShell: npm.cmd ci
Start development server: npm.cmd run dev
Keep the server terminal open and use its exact Local URL.

## Quality checks
Lint: npm.cmd run lint
Production build: npm.cmd run build
Developer-run lint and build passed for Module 4.
Module 4 manual checks passed: delete cancellation and confirmation, last-entry empty state, prefilled edit form, saving without duplicates, summary updates, cancelling edits, switching edited records, and adding after editing.
Manual checks passed: required fields, whitespace validation, demo replacement, multiple entries, derived counts, success feedback, form reset, keyboard access, narrow layout, and refresh behavior.
Earlier checks covered empty-list counts and keyboard skip navigation.
Automated behavior tests are planned for Module 7.

## Structure
- src/components/ui: shared UI components
- src/components/layout: layout components
- src/components/applications: form, cards, list, and summary
- src/data: fictional sample records
- src/pages: page composition and application state

## Git workflow
main -> dev -> feature/* or fix/*
Create feature/fix branches from dev.
Feature/fix branches merge into dev through pull requests.
Verified releases merge from dev into main through pull requests.
Use Create a merge commit.

## Learning approach
Built module by module with AI-assisted guidance and code review.
