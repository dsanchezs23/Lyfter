import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductModel } from './product.model';

describe('ProductModel', () => {
  let component: ProductModel;
  let fixture: ComponentFixture<ProductModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductModel],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductModel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
