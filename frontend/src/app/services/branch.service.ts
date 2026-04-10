import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Branch } from '../models/branch.model';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private nextId = 1;
  private branchesSubject = new BehaviorSubject<Branch[]>([]);

  branches$: Observable<Branch[]> = this.branchesSubject.asObservable();

  getAll(): Branch[] {
    return this.branchesSubject.getValue();
  }

  create(data: Omit<Branch, 'id'>): Branch {
    const branch: Branch = { id: this.nextId++, ...data };
    this.branchesSubject.next([...this.getAll(), branch]);
    return branch;
  }

  update(id: number, data: Omit<Branch, 'id'>): void {
    const updated = this.getAll().map(b =>
      b.id === id ? { ...b, ...data } : b
    );
    this.branchesSubject.next(updated);
  }

  delete(id: number): void {
    this.branchesSubject.next(this.getAll().filter(b => b.id !== id));
  }
}
