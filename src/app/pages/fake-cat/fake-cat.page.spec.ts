import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FakeCatPage } from './fake-cat.page';

describe('FakeCatPage', () => {
  let component: FakeCatPage;
  let fixture: ComponentFixture<FakeCatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FakeCatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FakeCatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
