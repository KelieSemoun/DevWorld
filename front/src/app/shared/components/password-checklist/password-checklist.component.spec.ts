import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordChecklistComponent } from './password-checklist.component';

describe('PasswordChecklistComponent', () => {
  let component: PasswordChecklistComponent;
  let fixture: ComponentFixture<PasswordChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordChecklistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
