import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBoard } from './add-board';

describe('AddBoard', () => {
  let component: AddBoard;
  let fixture: ComponentFixture<AddBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBoard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
