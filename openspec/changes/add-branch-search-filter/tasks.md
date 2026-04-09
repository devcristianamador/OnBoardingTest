## 1. Add Search Input to Toolbar

- [ ] 1.1 Add PrimeNG InputText with search icon and clear button to `BranchListComponent` toolbar (`feat` commit)
- [ ] 1.2 Configure `p-table` with `globalFilterFields` for name and address columns (`feat` commit)

## 2. Implement Filter Logic

- [ ] 2.1 Wire search input to PrimeNG Table's `filterGlobal` method for real-time filtering (`feat` commit)
- [ ] 2.2 Add clear button functionality to reset the filter and show all branches (`feat` commit)

## 3. Unit Tests

- [ ] 3.1 Write unit test verifying search input is rendered in the toolbar (`test` commit)
- [ ] 3.2 Write unit test verifying filtering by branch name (`test` commit)
- [ ] 3.3 Write unit test verifying filtering by branch address (`test` commit)
- [ ] 3.4 Write unit test verifying "No results found" message when filter matches nothing (`test` commit)
- [ ] 3.5 Write unit test verifying clear button resets the filter (`test` commit)

## 4. Verification

- [ ] 4.1 Run full test suite (`ng test`) and verify all tests pass (`test` commit)
- [ ] 4.2 Run build (`ng build`) and verify no errors (`chore` commit)
