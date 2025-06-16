import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertaUsuarioComponent } from './oferta-usuario.component';

describe('OfertaUsuarioComponent', () => {
  let component: OfertaUsuarioComponent;
  let fixture: ComponentFixture<OfertaUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfertaUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OfertaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
