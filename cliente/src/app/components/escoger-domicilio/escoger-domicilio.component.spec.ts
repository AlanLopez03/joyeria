import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscogerDomicilioComponent } from './escoger-domicilio.component';

describe('EscogerDomicilioComponent', () => {
  let component: EscogerDomicilioComponent;
  let fixture: ComponentFixture<EscogerDomicilioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EscogerDomicilioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EscogerDomicilioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
