# RoleTrail

A beginner React portfolio project for organizing job applications.

## Current progress
Module 1: responsive UI foundation.

- Reusable Button, Header, and EmptyState components
- Responsive dashboard page
- Keyboard-accessible skip link
- Disabled add button with an explanation

Application forms, listings, and persistence are planned.
The current version does not save or manage applications.

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
Manual UI checks passed for desktop, narrow screens, and keyboard navigation.
Automated behavior tests are planned with interactive features.

## Structure
- src/components/ui: reusable UI components
- src/components/layout: layout components
- src/pages: page composition

## Git workflow
main -> dev -> feature/* or fix/*
Feature/fix branches merge into dev through pull requests.
Verified module releases merge from dev into main through pull requests.

## Learning approach
Built module by module with AI-assisted guidance and code review.
