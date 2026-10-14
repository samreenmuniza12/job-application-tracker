# RoleTrail

A beginner React portfolio project for organizing job applications.

## Current progress
Modules 1 and 2: responsive UI foundation and application listing.

- Reusable application cards, status badges, list, and summary
- Four clearly labelled fictional demo records with stable IDs
- Summary counts calculated from records
- Empty state, responsive layout, and keyboard skip navigation

## Limitations
Adding, editing, deleting, search, filtering, and persistence are planned.
The current version does not save applications.

## Stack
React, JavaScript, Vite, Tailwind CSS, and ESLint.
Development environment: Node.js 22.20.0.

## Run locally
Install dependencies: npm ci
Start development server: npm run dev
Open the Local URL shown in the terminal.

## Quality checks
Lint: npm run lint
Production build: npm run build
Developer-run checks passed: demo cards/counts, empty list/zero counts, narrow layout, and keyboard skip navigation.
Automated behavior tests are planned.

## Structure
- src/components/ui: shared UI components
- src/components/layout: layout components
- src/components/applications: cards, list, and summary
- src/data: fictional sample records
- src/pages: page composition

## Git workflow
main -> dev -> feature/* or fix/*
Feature/fix branches merge into dev through pull requests.
Verified releases merge from dev into main through pull requests.

## Learning approach
Built module by module with AI-assisted guidance and code review.
