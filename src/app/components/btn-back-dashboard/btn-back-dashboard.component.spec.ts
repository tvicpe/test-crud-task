import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnBackDashboardComponent } from './btn-back-dashboard.component';

describe('BtnBackDashboardComponent', () => {
  let component: BtnBackDashboardComponent;
  let fixture: ComponentFixture<BtnBackDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnBackDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnBackDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
