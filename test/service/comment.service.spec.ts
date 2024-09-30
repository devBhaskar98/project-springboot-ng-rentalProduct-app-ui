
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {CommentService} from '../../src/app/service/comment.service'
import { TestBed } from '@angular/core/testing';
import { Comments } from '../../src/app/models';
import { API_URL } from '../../src/app/constant/app.constant';

describe('CommentService', ()=> {
    let service: CommentService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CommentService]
        });

        service = TestBed.inject(CommentService);
        httpMock = TestBed.inject(HttpTestingController);
    })

    afterEach(() => {
        httpMock.verify();
    })

    it('should return the comments (GET)', ()=> {
        const mockComments: Comments[] = [
            { id: 1, comment: 'jest unit test'},
            { id: 1, comment: 'test bed is awesome'},
        ];

        service.getComment().subscribe((comments) => {
            console.log("RESPONSE COMMENT", comments);
            expect(comments).toEqual(mockComments);
        })
        
        const req = httpMock.expectOne(`${API_URL}/comment/`);
        expect(req.request.method).toBe('GET');
        req.flush(mockComments); // response with mock data
    })


})