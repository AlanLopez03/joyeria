import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioComprasComponent } from './usuario-compras.component';

describe('UsuarioComprasComponent', () => {
  let component: UsuarioComprasComponent;
  let fixture: ComponentFixture<UsuarioComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsuarioComprasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsuarioComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
