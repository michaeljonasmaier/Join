import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GreyBackgroundComponent } from './grey-background.component';

describe('GreyBackgroundComponent', () => {
  let component: GreyBackgroundComponent;
  let fixture: ComponentFixture<GreyBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GreyBackgroundComponent]
    })
    
    .compileComponents();
    fixture = TestBed.createComponent(GreyBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
