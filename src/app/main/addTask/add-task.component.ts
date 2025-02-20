import { Component } from '@angular/core';
import { Task } from '../../interfaces/task';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {
  task: Task = {
    title: "",
    date: "",
    category: 'Technical Task',
    description: "",
    prio: 'Medium',
    subtasks: [],
    assigned: [],
    id: "",
    status: "To do",
  }
}
