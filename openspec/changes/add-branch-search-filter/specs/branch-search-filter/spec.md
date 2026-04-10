## ADDED Requirements

### Requirement: Global search input
The system SHALL display a text input field in the toolbar that allows the user to type a search term to filter the branch table in real-time.

#### Scenario: Search input is visible
- **WHEN** the user views the branch management page
- **THEN** a search input field with a placeholder "Search branches..." is visible in the toolbar

### Requirement: Filter branches by search term
The system SHALL filter the displayed branches in real-time as the user types, matching the search term against both the name and address columns (case-insensitive, contains match).

#### Scenario: Filter by branch name
- **WHEN** the user types "main" in the search input
- **THEN** only branches whose name contains "main" (case-insensitive) are displayed in the table

#### Scenario: Filter by branch address
- **WHEN** the user types "oak" in the search input
- **THEN** only branches whose address contains "oak" (case-insensitive) are displayed in the table

#### Scenario: No results found
- **WHEN** the user types a search term that matches no branches
- **THEN** the table displays a "No results found" message

### Requirement: Clear search filter
The system SHALL provide a clear button on the search input to reset the filter and show all branches.

#### Scenario: Clear the search filter
- **WHEN** the user clicks the clear button on the search input
- **THEN** the search input is cleared and all branches are displayed in the table
