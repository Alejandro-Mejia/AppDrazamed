import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FakeHomePage } from './fake-home.page';

describe('FakeHomePage', () => {
  let component: FakeHomePage;
  let fixture: ComponentFixture<FakeHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FakeHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FakeHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
