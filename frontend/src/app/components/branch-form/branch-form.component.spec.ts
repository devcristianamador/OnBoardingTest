import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BranchFormComponent } from './branch-form.component';
import { BranchService } from '../../services/branch.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

describe('BranchFormComponent', () => {
  let component: BranchFormComponent;
  let fixture: ComponentFixture<BranchFormComponent>;
  let branchServiceSpy: jasmine.SpyObj<BranchService>;

  beforeEach(async () => {
    branchServiceSpy = jasmine.createSpyObj('BranchService', ['create', 'update']);

    await TestBed.configureTestingModule({
      declarations: [BranchFormComponent],
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        ReactiveFormsModule,
        DialogModule,
        ButtonModule,
        InputTextModule
      ],
      providers: [{ provide: BranchService, useValue: branchServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(BranchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('open', () => {
    it('should open dialog with empty form for new branch', () => {
      component.open();
      expect(component.visible).toBeTrue();
      expect(component.form.value.name).toBe('');
      expect(component.form.value.address).toBe('');
      expect(component.dialogTitle).toBe('New Branch');
    });

    it('should open dialog pre-filled for edit branch', () => {
      component.open({ id: 1, name: 'Branch A', address: 'Address A' });
      expect(component.visible).toBeTrue();
      expect(component.form.value.name).toBe('Branch A');
      expect(component.form.value.address).toBe('Address A');
      expect(component.dialogTitle).toBe('Edit Branch');
    });
  });

  describe('onSave', () => {
    it('should not save when form is invalid', () => {
      component.open();
      component.onSave();
      expect(branchServiceSpy.create).not.toHaveBeenCalled();
    });

    it('should mark all fields as touched when saving invalid form', () => {
      component.open();
      component.onSave();
      expect(component.form.get('name')?.touched).toBeTrue();
      expect(component.form.get('address')?.touched).toBeTrue();
    });

    it('should call create when form is valid and no branch is being edited', () => {
      component.open();
      component.form.setValue({ name: 'Branch A', address: 'Address A' });
      component.onSave();
      expect(branchServiceSpy.create).toHaveBeenCalledWith({ name: 'Branch A', address: 'Address A' });
      expect(component.visible).toBeFalse();
    });

    it('should call update when editing an existing branch', () => {
      component.open({ id: 1, name: 'Old Name', address: 'Old Address' });
      component.form.setValue({ name: 'New Name', address: 'New Address' });
      component.onSave();
      expect(branchServiceSpy.update).toHaveBeenCalledWith(1, { name: 'New Name', address: 'New Address' });
      expect(component.visible).toBeFalse();
    });
  });

  describe('onCancel', () => {
    it('should close dialog on cancel', () => {
      component.open();
      component.onCancel();
      expect(component.visible).toBeFalse();
    });
  });
});
