import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderModel } from './order.model';

describe('OrderModel', () => {
  let component: OrderModel;
  let fixture: ComponentFixture<OrderModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderModel],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderModel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
