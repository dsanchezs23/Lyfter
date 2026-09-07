import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CartItemService } from './cart-item';

describe('CartItemService', () => {
  let service: CartItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CartItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
