## Context

The branch list currently displays all branches without any filtering capability. As the dataset grows, users need to search. The PrimeNG Table has built-in global filter support via `p-table`'s `globalFilterFields` property combined with a filter input, making this straightforward to implement without additional dependencies.

## Goals / Non-Goals

**Goals:**
- Add a text input for real-time global search in the branch table
- Filter against both `name` and `address` columns (case-insensitive)
- Provide a clear button to reset the filter
- Show "No results found" when filter matches nothing
- Cover filtering logic with unit tests

**Non-Goals:**
- Server-side filtering or pagination (data is in-memory)
- Per-column filtering or advanced filter operators
- Search history or autocomplete suggestions

## Decisions

### 1. Use PrimeNG Table's built-in global filter

**Decision**: Use `p-table`'s `#dt` template variable and `dt.filterGlobal(value, 'contains')` with `globalFilterFields` property.

**Rationale**: PrimeNG Table has native global filter support. This avoids reimplementing filter logic and leverages the table's built-in case-insensitive contains matching.

**Alternative considered**: Manual array filtering in the component — rejected because it would duplicate what PrimeNG already provides and require maintaining a separate filtered array.

### 2. Search input in toolbar

**Decision**: Place the search input in the toolbar's right template, next to the "New Branch" button, using PrimeNG's `InputText` with an icon.

**Rationale**: The toolbar already has a right section. Placing search there keeps the UI clean and follows common table + toolbar patterns.

## Risks / Trade-offs

- **[Performance with large datasets]** → PrimeNG's global filter is client-side. For in-memory storage with reasonable branch counts, this is fine. If the dataset grows very large, virtual scrolling or server-side filtering would be needed (out of scope).
