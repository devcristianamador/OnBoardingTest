import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BranchService } from '../../services/branch.service';
import { Branch } from '../../models/branch.model';

@Component({
  selector: 'app-branch-form',
  templateUrl: './branch-form.component.html'
})
export class BranchFormComponent {
  visible = false;
  form: FormGroup;
  private editingId: number | null = null;

  constructor(private fb: FormBuilder, private branchService: BranchService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  get dialogTitle(): string {
    return this.editingId !== null ? 'Edit Branch' : 'New Branch';
  }

  open(branch?: Branch): void {
    this.editingId = branch?.id ?? null;
    this.form.reset({
      name: branch?.name ?? '',
      address: branch?.address ?? ''
    });
    this.visible = true;
  }

  onSave(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const { name, address } = this.form.value;
    if (this.editingId !== null) {
      this.branchService.update(this.editingId, { name, address });
    } else {
      this.branchService.create({ name, address });
    }
    this.visible = false;
  }

  onCancel(): void {
    this.visible = false;
  }
}
