import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidemenuPage } from './sidemenu.page';

describe('SidemenuPage', () => {
  let component: SidemenuPage;
  let fixture: ComponentFixture<SidemenuPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SidemenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
