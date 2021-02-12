import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiInterfaceScreenOneComponent } from './api-interface-screen-one.component';

describe('ApiInterfaceScreenOneComponent', () => {
  let component: ApiInterfaceScreenOneComponent;
  let fixture: ComponentFixture<ApiInterfaceScreenOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiInterfaceScreenOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiInterfaceScreenOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
