import { TestBed } from '@angular/core/testing';
import { BranchService } from './branch.service';
import { Branch } from '../models/branch.model';

describe('BranchService', () => {
  let service: BranchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BranchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('should return an empty array initially', () => {
      expect(service.getAll()).toEqual([]);
    });

    it('should return all created branches', () => {
      service.create({ name: 'Branch A', address: 'Address A' });
      service.create({ name: 'Branch B', address: 'Address B' });
      expect(service.getAll().length).toBe(2);
    });
  });

  describe('create', () => {
    it('should create a branch with auto-incremented id', () => {
      const branch = service.create({ name: 'Branch A', address: 'Address A' });
      expect(branch.id).toBe(1);
    });

    it('should assign unique ids to consecutive branches', () => {
      const first = service.create({ name: 'Branch A', address: 'Address A' });
      const second = service.create({ name: 'Branch B', address: 'Address B' });
      expect(first.id).not.toBe(second.id);
    });

    it('should emit updated list via branches$', (done) => {
      service.branches$.subscribe(branches => {
        if (branches.length === 1) {
          expect(branches[0].name).toBe('Branch A');
          done();
        }
      });
      service.create({ name: 'Branch A', address: 'Address A' });
    });
  });

  describe('update', () => {
    it('should update an existing branch name and address', () => {
      const branch = service.create({ name: 'Old Name', address: 'Old Address' });
      service.update(branch.id, { name: 'New Name', address: 'New Address' });
      const updated = service.getAll().find(b => b.id === branch.id);
      expect(updated?.name).toBe('New Name');
      expect(updated?.address).toBe('New Address');
    });

    it('should not modify other branches when updating one', () => {
      const first = service.create({ name: 'Branch A', address: 'Address A' });
      service.create({ name: 'Branch B', address: 'Address B' });
      service.update(first.id, { name: 'Updated A', address: 'Updated Address A' });
      const second = service.getAll().find(b => b.name === 'Branch B');
      expect(second).toBeTruthy();
    });

    it('should do nothing when id does not exist', () => {
      service.create({ name: 'Branch A', address: 'Address A' });
      service.update(999, { name: 'Ghost', address: 'Ghost Address' });
      expect(service.getAll().length).toBe(1);
    });
  });

  describe('delete', () => {
    it('should remove a branch by id', () => {
      const branch = service.create({ name: 'Branch A', address: 'Address A' });
      service.delete(branch.id);
      expect(service.getAll().length).toBe(0);
    });

    it('should not affect other branches when deleting one', () => {
      const first = service.create({ name: 'Branch A', address: 'Address A' });
      service.create({ name: 'Branch B', address: 'Address B' });
      service.delete(first.id);
      expect(service.getAll().length).toBe(1);
      expect(service.getAll()[0].name).toBe('Branch B');
    });

    it('should do nothing when id does not exist', () => {
      service.create({ name: 'Branch A', address: 'Address A' });
      service.delete(999);
      expect(service.getAll().length).toBe(1);
    });
  });
});
