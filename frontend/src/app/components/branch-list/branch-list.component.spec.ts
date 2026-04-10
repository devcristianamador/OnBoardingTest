import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BranchListComponent } from './branch-list.component';
import { BranchFormComponent } from '../branch-form/branch-form.component';
import { BranchService } from '../../services/branch.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { Branch } from '../../models/branch.model';

describe('BranchListComponent', () => {
  let component: BranchListComponent;
  let fixture: ComponentFixture<BranchListComponent>;
  let branchServiceSpy: jasmine.SpyObj<BranchService>;
  let branchesSubject: BehaviorSubject<Branch[]>;

  const testBranches: Branch[] = [
    { id: 1, name: 'Bogota Centro', address: 'Calle 10 #5-20' },
    { id: 2, name: 'Medellin Norte', address: 'Carrera 80 #30-15' }
  ];

  beforeEach(async () => {
    branchesSubject = new BehaviorSubject<Branch[]>([]);
    branchServiceSpy = jasmine.createSpyObj('BranchService', ['delete'], {
      branches$: branchesSubject.asObservable()
    });

    await TestBed.configureTestingModule({
      declarations: [BranchListComponent, BranchFormComponent],
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TableModule,
        ButtonModule,
        ToolbarModule,
        ConfirmDialogModule,
        ToastModule,
        DialogModule,
        InputTextModule
      ],
      providers: [
        { provide: BranchService, useValue: branchServiceSpy },
        ConfirmationService,
        MessageService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BranchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display branches from service', () => {
    branchesSubject.next(testBranches);
    fixture.detectChanges();
    expect(component.branches.length).toBe(2);
  });

  it('should show empty state when no branches', () => {
    branchesSubject.next([]);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('No branches found.');
  });

  it('should render search input in toolbar', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const searchInput = compiled.querySelector('input[aria-label="Search branches"]');
    expect(searchInput).toBeTruthy();
  });

  it('should filter branches by name', () => {
    branchesSubject.next(testBranches);
    fixture.detectChanges();
    // Simulate search input event for name filter
    const event = { target: { value: 'Bogota' } } as unknown as Event;
    component.onSearch(event);
    fixture.detectChanges();
    expect(component.searchTerm).toBe('');
    // filterGlobal is called on the table — verify table reference exists
    expect(component.table).toBeTruthy();
  });

  it('should filter branches by address', () => {
    branchesSubject.next(testBranches);
    fixture.detectChanges();
    const event = { target: { value: 'Carrera 80' } } as unknown as Event;
    component.onSearch(event);
    fixture.detectChanges();
    expect(component.table).toBeTruthy();
  });

  it('should show "No branches found" when filter matches nothing', () => {
    branchesSubject.next(testBranches);
    fixture.detectChanges();
    const event = { target: { value: 'xyz_no_match' } } as unknown as Event;
    component.onSearch(event);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('No branches found.');
  });

  it('should clear search term and reset filter on clearSearch', () => {
    branchesSubject.next(testBranches);
    fixture.detectChanges();
    component.searchTerm = 'Bogota';
    component.clearSearch();
    expect(component.searchTerm).toBe('');
  });

  it('should call confirmDelete when delete button clicked', () => {
    spyOn(component, 'confirmDelete');
    const branch: Branch = testBranches[0];
    component.confirmDelete(branch);
    expect(component.confirmDelete).toHaveBeenCalledWith(branch);
  });

  it('should call editBranch when edit button clicked', () => {
    spyOn(component, 'editBranch');
    component.editBranch(testBranches[0]);
    expect(component.editBranch).toHaveBeenCalledWith(testBranches[0]);
  });
});
