import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartItemModel } from './cart-item.model.ts.js';

describe('CartItemModel', () => {
  let component: CartItemModel;
  let fixture: ComponentFixture<CartItemModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartItemModel],
    }).compileComponents();

    fixture = TestBed.createComponent(CartItemModel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
