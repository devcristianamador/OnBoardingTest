## Context

The `BranchFormComponent` uses Angular Reactive Forms with `Validators.required` on both `name` and `address` controls. The Save button is disabled via `[disabled]="branchForm.invalid"`, which prevents submission but provides no visual explanation. The template shows error messages conditionally with `*ngIf="branchForm.get('name')?.invalid && branchForm.get('name')?.touched"` — meaning errors only appear after a field is touched. This is standard Angular behavior but creates a UX gap when the user never interacts with the fields.

## Goals / Non-Goals

**Goals:**
- Ensure all validation error messages display when the user attempts to save an empty form
- Maintain the existing disabled-button behavior as a secondary safeguard
- Add test coverage for the validation feedback behavior

**Non-Goals:**
- Changing the validation rules themselves (required is sufficient)
- Adding new form fields or validators
- Modifying the form layout or styling

## Decisions

### 1. Mark all fields as touched on save attempt

**Decision**: Call `this.branchForm.markAllAsTouched()` at the beginning of the `onSave()` method, before the validity check.

**Rationale**: This is the standard Angular approach for triggering validation display. It marks all controls as touched, which makes the existing `*ngIf="...touched"` conditions evaluate to true, showing error messages immediately.

**Alternative considered**: Removing the `?.touched` condition from the template — rejected because it would show errors prematurely when the dialog first opens, before the user has had a chance to fill in the form.

## Risks / Trade-offs

- **[Minimal risk]** → The change is a single line addition to the `onSave()` method. No side effects expected since `markAllAsTouched()` only affects the UI state of form controls.
