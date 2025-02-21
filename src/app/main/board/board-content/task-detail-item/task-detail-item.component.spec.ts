import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailItemComponent } from './task-detail-item.component';

describe('TaskDetailItemComponent', () => {
  let component: TaskDetailItemComponent;
  let fixture: ComponentFixture<TaskDetailItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDetailItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskDetailItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
