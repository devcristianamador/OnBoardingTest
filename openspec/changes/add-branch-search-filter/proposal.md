## Why

As the number of bank branches grows, users need a way to quickly find specific branches without scrolling through the entire table. Adding a global search/filter capability to the branch list improves usability and productivity. (DVLAB-5 / HU: DVLAB-5)

**Branch**: `feature/DVLAB-5/add-branch-search-filter` (from `development`)

## What Changes

- Add a global search input field above the PrimeNG Table in `BranchListComponent`
- Implement real-time filtering that matches the search term against both branch name and address fields (case-insensitive)
- Show a clear button to reset the search filter
- Display a "No results found" message when the filter yields no matches
- Include unit tests for the filtering behavior following Davivienda testing standards

## Capabilities

### New Capabilities

- `branch-search-filter`: Global text search input that filters the branch table in real-time by name and address, with clear functionality and empty result messaging

### Modified Capabilities

_None — filtering is additive and does not change existing CRUD behavior._

## Impact

- **Modified file**: `frontend/src/app/components/branch-list/branch-list.component.ts` (add filter logic)
- **Modified file**: `frontend/src/app/components/branch-list/branch-list.component.html` (add search input)
- **Modified file**: `frontend/src/app/components/branch-list/branch-list.component.spec.ts` (add filter tests)
- **No new dependencies** — uses PrimeNG InputText (already installed)
- **No breaking changes**
