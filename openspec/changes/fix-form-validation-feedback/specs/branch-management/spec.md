## MODIFIED Requirements

### Requirement: Create a new branch
The system SHALL allow users to create a new branch by filling in name and address fields via a dialog form. When the user attempts to save with empty required fields, the system SHALL display validation error messages immediately.

#### Scenario: Save attempt with empty fields shows validation errors
- **WHEN** the user opens the create dialog and clicks "Save" without filling any fields
- **THEN** the system marks all fields as touched and displays validation error messages for name and address

#### Scenario: Save new branch with valid data
- **WHEN** the user fills in the name and address fields and clicks "Save"
- **THEN** the system stores the new branch in memory with an auto-generated ID and the table updates to show the new record

### Requirement: Edit an existing branch
The system SHALL allow users to edit a branch's name and address via a dialog form. When the user clears a required field and attempts to save, the system SHALL display validation error messages immediately.

#### Scenario: Save attempt with cleared required field shows validation error
- **WHEN** the user opens the edit dialog, clears the name field, and clicks "Save"
- **THEN** the system displays a validation error message for the name field
