import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoServicoComponent } from './produto-servico.component';

describe('ProdutoServicoComponent', () => {
  let component: ProdutoServicoComponent;
  let fixture: ComponentFixture<ProdutoServicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutoServicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutoServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
