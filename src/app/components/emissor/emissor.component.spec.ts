import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmissorComponent } from './emissor.component';

describe('EmissorComponent', () => {
  let component: EmissorComponent;
  let fixture: ComponentFixture<EmissorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmissorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmissorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
