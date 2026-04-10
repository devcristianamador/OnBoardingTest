import { Component, OnInit, ViewChild } from '@angular/core';
import { BranchService } from '../../services/branch.service';
import { Branch } from '../../models/branch.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BranchFormComponent } from '../branch-form/branch-form.component';

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html'
})
export class BranchListComponent implements OnInit {
  @ViewChild('branchForm') branchForm!: BranchFormComponent;

  branches: Branch[] = [];

  constructor(
    private branchService: BranchService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.branchService.branches$.subscribe(branches => {
      this.branches = branches;
    });
  }

  openNew(): void {
    this.branchForm.open();
  }

  editBranch(branch: Branch): void {
    this.branchForm.open(branch);
  }

  confirmDelete(branch: Branch): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete "${branch.name}"?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.branchService.delete(branch.id);
        this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Branch deleted' });
      }
    });
  }
}
