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
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { Branch } from '../../models/branch.model';

describe('BranchListComponent', () => {
  let component: BranchListComponent;
  let fixture: ComponentFixture<BranchListComponent>;
  let branchServiceSpy: jasmine.SpyObj<BranchService>;
  let branchesSubject: BehaviorSubject<Branch[]>;

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
    const testBranches: Branch[] = [
      { id: 1, name: 'Branch A', address: 'Address A' },
      { id: 2, name: 'Branch B', address: 'Address B' }
    ];
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

  it('should call confirmDelete when delete button clicked', () => {
    spyOn(component, 'confirmDelete');
    const branch: Branch = { id: 1, name: 'Branch A', address: 'Address A' };
    branchesSubject.next([branch]);
    fixture.detectChanges();
    component.confirmDelete(branch);
    expect(component.confirmDelete).toHaveBeenCalledWith(branch);
  });

  it('should call editBranch when edit button clicked', () => {
    spyOn(component, 'editBranch');
    const branch: Branch = { id: 1, name: 'Branch A', address: 'Address A' };
    component.editBranch(branch);
    expect(component.editBranch).toHaveBeenCalledWith(branch);
  });
});
