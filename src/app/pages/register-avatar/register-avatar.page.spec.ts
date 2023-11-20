import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterAvatarPage } from './register-avatar.page';

describe('RegisterAvatarPage', () => {
  let component: RegisterAvatarPage;
  let fixture: ComponentFixture<RegisterAvatarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegisterAvatarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
