import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from '../../src/app/service/product.service';
import { Product, PageRequestDTO } from '../../src/app/models/index'
import { API_URL } from '../../src/app/constant/app.constant'

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule
      providers: [ProductService],
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifies that no unmatched HTTP requests are outstanding
  });

  it('should retrieve products (GET)', () => {
    const mockProducts: Product[] = [
      { id: 1, name: 'Product 1', price: 100 },
      { id: 2, name: 'Product 2', price : 200 },
    ];

    service.getProducts().subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(`${API_URL}/product/`);
    expect(req.request.method).toBe('GET'); // Ensure the correct HTTP method is used
    req.flush(mockProducts); // Respond with mock data
  });

  it('should retrieve paginated products (POST)', () => {
    const mockResponse = {
      content: [{ id: 1, name: 'Product 1', price: 100 }],
      totalPages: 10,
      totalElements: 100,
    };

    const pageRequestDto: PageRequestDTO = { 
      pageNo: 1, 
      pageSize: 10,
      sort: "ASC",
      sortByColumn: "name"
    };

    service.getProductsPaginated(pageRequestDto).subscribe((response) => {
      expect(response).toEqual(mockResponse);

      // Additional checks can be made here for content, totalPages, etc.
      expect(response.content.length).toBe(1);
      expect(response.totalPages).toBe(10);
      expect(response.totalElements).toBe(100);
    });

    const req = httpMock.expectOne(`${API_URL}/product/page`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ pageNo: 1, pageSize: 10, sort: 'ASC', sortByColumn: 'name' }); // Check the request body
    req.flush(mockResponse); // Simulate a server response
  });
});
