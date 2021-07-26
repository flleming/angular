import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceCadreComponent } from './espace-cadre.component';

describe('EspaceCadreComponent', () => {
  let component: EspaceCadreComponent;
  let fixture: ComponentFixture<EspaceCadreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspaceCadreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspaceCadreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
