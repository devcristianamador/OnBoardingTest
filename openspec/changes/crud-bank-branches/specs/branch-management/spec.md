## ADDED Requirements

### Requirement: Branch model definition
The system SHALL define a `Branch` interface with the fields: `id` (number), `name` (string), and `address` (string).

#### Scenario: Branch interface structure
- **WHEN** a branch record is created
- **THEN** it MUST contain `id`, `name`, and `address` properties

### Requirement: List all branches
The system SHALL display all bank branches in a PrimeNG Table with columns for name and address, plus an actions column.

#### Scenario: Display branches in table
- **WHEN** the user navigates to the branch management view
- **THEN** the system displays a table with all existing branches showing name and address

#### Scenario: Empty state
- **WHEN** there are no branches stored
- **THEN** the system displays an empty table

### Requirement: Create a new branch
The system SHALL allow users to create a new branch by filling in name and address fields via a dialog form.

#### Scenario: Open create dialog
- **WHEN** the user clicks the "New Branch" button
- **THEN** the system opens a dialog with an empty form containing name and address fields

#### Scenario: Save new branch
- **WHEN** the user fills in the name and address fields and clicks "Save"
- **THEN** the system stores the new branch in memory with an auto-generated ID and the table updates to show the new record

#### Scenario: Cancel creation
- **WHEN** the user clicks "Cancel" on the create dialog
- **THEN** the dialog closes and no branch is created

### Requirement: Edit an existing branch
The system SHALL allow users to edit a branch's name and address via a dialog form.

#### Scenario: Open edit dialog
- **WHEN** the user clicks the "Edit" button on a branch row
- **THEN** the system opens a dialog with the form pre-filled with the branch's current name and address

#### Scenario: Save edited branch
- **WHEN** the user modifies the name or address and clicks "Save"
- **THEN** the system updates the branch in memory and the table reflects the changes

### Requirement: Delete a branch
The system SHALL allow users to delete a branch with a confirmation step.

#### Scenario: Confirm deletion
- **WHEN** the user clicks the "Delete" button on a branch row
- **THEN** the system displays a confirmation dialog asking if the user wants to delete the branch

#### Scenario: Confirm and delete
- **WHEN** the user confirms the deletion
- **THEN** the system removes the branch from memory and the table updates accordingly

#### Scenario: Cancel deletion
- **WHEN** the user cancels the deletion
- **THEN** the branch remains unchanged and the dialog closes

### Requirement: In-memory storage via service
The `BranchService` SHALL store branches in-memory using a `BehaviorSubject` and expose CRUD operations as methods.

#### Scenario: Service provides observable branch list
- **WHEN** a component subscribes to the branch list
- **THEN** it receives the current list of branches and any subsequent updates

#### Scenario: Service generates unique IDs
- **WHEN** a new branch is created via the service
- **THEN** the service assigns a unique auto-incrementing numeric ID
