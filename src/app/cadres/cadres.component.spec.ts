import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadresComponent } from './cadres.component';

describe('CadresComponent', () => {
  let component: CadresComponent;
  let fixture: ComponentFixture<CadresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
