import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartModel } from './cart.model.ts.js';

describe('CartModel', () => {
  let component: CartModel;
  let fixture: ComponentFixture<CartModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartModel],
    }).compileComponents();

    fixture = TestBed.createComponent(CartModel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
