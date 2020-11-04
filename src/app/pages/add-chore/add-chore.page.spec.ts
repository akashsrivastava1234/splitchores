import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChorePage } from './add-chore.page';

describe('AddChorePage', () => {
  let component: AddChorePage;
  let fixture: ComponentFixture<AddChorePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddChorePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
