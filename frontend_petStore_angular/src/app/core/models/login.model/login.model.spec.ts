import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginModel } from './login.model';

describe('LoginModel', () => {
  let component: LoginModel;
  let fixture: ComponentFixture<LoginModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginModel],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginModel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
