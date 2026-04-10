## Why

The branch form dialog (BranchFormComponent) has `Validators.required` on both name and address fields, and the Save button is disabled when the form is invalid. However, when a user opens the dialog and immediately clicks Save without interacting with the fields, no validation error messages are displayed. The validation errors only appear after the user touches a field and leaves it empty. This creates a confusing UX where the button is disabled but the user has no visual indication of what's wrong. (DVLAB-3 / HU: DVLAB-3)

**Branch**: `bugfix/DVLAB-3/fix-form-validation-feedback` (from `development`)

## What Changes

- Modify `BranchFormComponent.onSave()` to mark all form fields as touched before checking validity, ensuring validation error messages display immediately on save attempt
- Add a dedicated unit test verifying that validation errors appear when saving with empty fields
- Ensure existing tests still pass after the fix

## Capabilities

### New Capabilities

_None — this is a bugfix on the existing `branch-management` capability._

### Modified Capabilities

- `branch-management`: The form save behavior changes to mark all fields as touched before validation check, providing immediate visual feedback for required fields

## Impact

- **Modified file**: `frontend/src/app/components/branch-form/branch-form.component.ts` (onSave method)
- **Modified file**: `frontend/src/app/components/branch-form/branch-form.component.spec.ts` (new test case)
- **No new dependencies**
- **No breaking changes**
