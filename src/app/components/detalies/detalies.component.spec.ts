import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaliesComponent } from './detalies.component';

describe('DetaliesComponent', () => {
  let component: DetaliesComponent;
  let fixture: ComponentFixture<DetaliesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetaliesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetaliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
