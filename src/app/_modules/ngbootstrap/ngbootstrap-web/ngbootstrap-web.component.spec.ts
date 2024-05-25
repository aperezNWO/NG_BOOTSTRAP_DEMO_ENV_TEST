import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbootstrapWebComponent } from './ngbootstrap-web.component';

describe('NgbootstrapWebComponent', () => {
  let component: NgbootstrapWebComponent;
  let fixture: ComponentFixture<NgbootstrapWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgbootstrapWebComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgbootstrapWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
