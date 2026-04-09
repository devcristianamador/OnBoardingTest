# Davivienda - Unit Testing Standards for Angular

This reference defines Davivienda's internal standards and best practices for unit testing in Angular applications. These guidelines complement the general Angular testing fundamentals and MUST be followed in all Davivienda projects.

## Testing Framework

Davivienda Angular projects use **Karma** as the test runner and **Jasmine** as the testing framework.

- **Karma**: Provides an environment to execute unit tests across different browsers, enabling cross-platform verification
- **Jasmine**: JavaScript testing framework used for writing test specs
- Test files follow the naming convention: `*.spec.ts`
- Run tests with: `ng test`

## Best Practices (Mandatory)

### 1. Write Tests Before Code (TDD)

Use Test-Driven Development (TDD) approach: write tests before implementing functionality.

```ts
// 1. First write the test
describe('CalculatorService', () => {
  it('should multiply two numbers correctly', () => {
    const service = TestBed.inject(CalculatorService);
    expect(service.multiply(3, 4)).toBe(12);
  });
});

// 2. Then implement the code to make it pass
```

### 2. Keep Tests Independent

Each test must be autonomous and NOT depend on the state of other tests. This facilitates error identification and improves reliability.

```ts
// GOOD: Each test starts with a clean state
describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should create a user', () => {
    // Independent test - no dependency on other tests
    const user = service.create({ name: 'Test' });
    expect(user).toBeTruthy();
  });

  it('should list users', () => {
    // Independent test - does not assume previous test ran
    const users = service.getAll();
    expect(users).toEqual([]);
  });
});
```

```ts
// BAD: Tests depend on shared mutable state
let sharedUser: User; // Shared state across tests

it('should create user', () => {
  sharedUser = service.create({ name: 'Test' });
});

it('should find the created user', () => {
  // FAILS if previous test didn't run
  expect(service.find(sharedUser.id)).toBeTruthy();
});
```

### 3. Use Descriptive Test Names

Use clear and descriptive names for tests so it's easy to understand what is being tested.

```ts
// GOOD: Descriptive names
it('should return the sum of two positive numbers', () => { ... });
it('should throw an error when dividing by zero', () => { ... });
it('should disable the submit button when form is invalid', () => { ... });

// BAD: Vague names
it('should work', () => { ... });
it('test 1', () => { ... });
it('handles error', () => { ... });
```

### 4. Use `beforeEach` for Setup

Configure the test environment in the `beforeEach` block to avoid code repetition and ensure each test starts with a clean state.

```ts
describe('SumaService', () => {
  let service: SumaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SumaService);
  });

  it('should add two numbers correctly', () => {
    expect(service.sumar(2, 3)).toBe(5);
    expect(service.sumar(-1, 1)).toBe(0);
  });
});
```

### 5. Test Both Positive and Negative Cases

Cover scenarios where functionality should work correctly AND scenarios where it should fail.

```ts
describe('DivisionService', () => {
  let service: DivisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DivisionService);
  });

  // Positive case
  it('should divide two numbers correctly', () => {
    expect(service.divide(10, 2)).toBe(5);
  });

  // Negative case
  it('should throw error when dividing by zero', () => {
    expect(() => service.divide(10, 0)).toThrowError('Division by zero');
  });

  // Edge case
  it('should return 0 when numerator is 0', () => {
    expect(service.divide(0, 5)).toBe(0);
  });
});
```

### 6. Use Spies and Mocks

Use spies and mocks to simulate dependencies and control external service behavior, allowing test isolation.

```ts
describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(() => {
    // Create a spy for the service
    const spy = jasmine.createSpyObj('UserService', ['getUser', 'saveUser']);

    TestBed.configureTestingModule({
      imports: [UserComponent],
      providers: [
        { provide: UserService, useValue: spy }
      ]
    });

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  it('should load user on init', () => {
    const mockUser = { id: 1, name: 'Julian' };
    userServiceSpy.getUser.and.returnValue(of(mockUser));

    component.ngOnInit();

    expect(userServiceSpy.getUser).toHaveBeenCalled();
  });

  it('should handle error when user not found', () => {
    userServiceSpy.getUser.and.returnValue(throwError(() => new Error('Not found')));

    component.ngOnInit();

    expect(component.error).toBe('Not found');
  });
});
```

### 7. Run Tests Frequently

Integrate test execution into the daily workflow to detect errors as soon as possible.

```bash
# Run all tests
ng test

# Run tests in watch mode during development
ng test --watch

# Run tests with code coverage
ng test --code-coverage
```

### 8. Review and Refactor Tests

Tests should be reviewed and refactored just like production code to maintain clarity and effectiveness.

### 9. Keep Tests Fast

Unit tests must execute quickly to not interrupt the development workflow. Avoid:
- Real HTTP calls (use mocks/spies)
- Complex DOM operations
- Unnecessary `setTimeout` or `setInterval`
- Large data sets when small ones suffice

### 10. Document Tests

Include comments and documentation where necessary to explain the logic behind tests, especially in complex cases.

```ts
describe('PaymentService', () => {
  /**
   * Payment validation tests
   * These tests verify the business rules for payment processing:
   * - Minimum amount: $1.00
   * - Maximum amount: $10,000.00
   * - Valid payment methods: credit_card, debit_card, transfer
   */
  describe('validatePayment', () => {
    it('should reject payments below minimum amount', () => {
      // Business rule: payments must be at least $1.00
      expect(service.validatePayment(0.50)).toBeFalse();
    });
  });
});
```

## Service Testing Pattern

Standard pattern for testing Angular services with Karma + Jasmine:

```ts
// example.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { ExampleService } from './example.service';

describe('ExampleService', () => {
  let service: ExampleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExampleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform expected operation', () => {
    const result = service.someMethod('input');
    expect(result).toBe('expected output');
  });
});
```

## Component Testing Pattern

Standard pattern for testing Angular components:

```ts
// example.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleComponent } from './example.component';

describe('ExampleComponent', () => {
  let component: ExampleComponent;
  let fixture: ComponentFixture<ExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Expected Title');
  });
});
```

## HTTP Service Testing Pattern

Pattern for testing services that make HTTP calls:

```ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify no outstanding HTTP requests
    httpMock.verify();
  });

  it('should fetch data', () => {
    const mockData = [{ id: 1, name: 'Test' }];

    service.getData().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('/api/data');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});
```
