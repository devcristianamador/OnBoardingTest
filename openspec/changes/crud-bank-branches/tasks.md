## 1. Project Setup

- [] 1.1 Scaffold Angular application in `frontend/` using Angular CLI with SCSS and no routing (`feat` commit)
- [] 1.2 Install and configure PrimeNG and PrimeFlex dependencies (`feat` commit)

## 2. Branch Model and Service

- [] 2.1 Create `Branch` interface with `id`, `name`, and `address` fields (`feat` commit)
- [] 2.2 Implement `BranchService` with in-memory BehaviorSubject storage and CRUD methods (getAll, create, update, delete) (`feat` commit)
- [] 2.3 Write unit tests for `BranchService` covering all CRUD operations, ID generation, positive and negative cases (`test` commit)

## 3. Branch List Component

- [] 3.1 Create `BranchListComponent` with PrimeNG Table displaying name, address, and actions columns (`feat` commit)
- [] 3.2 Add "New Branch" toolbar button and "Edit"/"Delete" action buttons per row (`feat` commit)
- [] 3.3 Write unit tests for `BranchListComponent` verifying table rendering, button interactions, and empty state (`test` commit)

## 4. Branch Form Component

- [] 4.1 Create `BranchFormComponent` with PrimeNG Dialog containing a reactive form for name and address (`feat` commit)
- [] 4.2 Integrate form dialog with list component for create and edit flows (`feat` commit)
- [] 4.3 Write unit tests for `BranchFormComponent` covering dialog open/close, form validation, save, and cancel (`test` commit)

## 5. Delete Confirmation

- [] 5.1 Add PrimeNG ConfirmDialog for branch deletion with confirm/cancel actions (`feat` commit)
- [] 5.2 Write unit tests for delete confirmation flow (`test` commit)

## 6. Integration and Final Verification

- [] 6.1 Integrate all components in AppComponent and verify full CRUD workflow (`feat` commit)
- [] 6.2 Run full test suite (`ng test`) and fix any failures (`test` commit)
- [] 6.3 Run build (`ng build`) and verify no errors (`chore` commit)
