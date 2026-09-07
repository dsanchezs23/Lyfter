import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserModelTs } from './user.model.ts.js';

describe('UserModelTs', () => {
  let component: UserModelTs;
  let fixture: ComponentFixture<UserModelTs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserModelTs],
    }).compileComponents();

    fixture = TestBed.createComponent(UserModelTs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
