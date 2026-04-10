## Why

The banking branch management system requires a user interface to perform CRUD operations (Create, Read, Update, Delete) on bank branches. This is the foundational feature (DVLAB-1 / HU: DVLAB-1) that enables administrators to manage branch records (name and address) through a web application. Data will be stored in-memory for this initial phase.

**Branch**: `feature/DVLAB-1/crud-bank-branches` (from `development`)

## What Changes

- Add a new Angular application scaffolded with PrimeNG and PrimeFlex in the `frontend/` directory
- Implement a `BranchService` for in-memory CRUD operations on bank branch records (name, address)
- Create a `BranchListComponent` with a PrimeNG Table to display all branches
- Create a `BranchFormComponent` with a PrimeNG Dialog containing a reactive form for creating and editing branches
- Add confirmation dialog for branch deletion using PrimeNG ConfirmDialog
- Include unit tests for the service and components following Davivienda testing standards (Karma + Jasmine)

## Capabilities

### New Capabilities

- `branch-management`: Core CRUD operations for bank branches — service layer with in-memory storage, list view with PrimeNG Table, create/edit form in a dialog, delete with confirmation

### Modified Capabilities

_None — this is a greenfield feature._

## Impact

- **New dependencies**: `primeng`, `primeflex` added to `frontend/package.json`
- **New files**: BranchService, BranchListComponent, BranchFormComponent, Branch model interface
- **Test files**: `*.spec.ts` for service and components
- **No backend impact**: All data is stored in-memory via the Angular service
