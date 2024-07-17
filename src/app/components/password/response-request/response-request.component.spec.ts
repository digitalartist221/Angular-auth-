import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseRequestComponent } from './response-request.component';

describe('ResponseRequestComponent', () => {
  let component: ResponseRequestComponent;
  let fixture: ComponentFixture<ResponseRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResponseRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResponseRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
