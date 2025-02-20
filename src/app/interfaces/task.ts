import { Contact } from "./contact";

export interface Task {
    title: string,
    date: string,
    status: 'To do' | 'In progress' | 'Await feedback' | 'Done',
    category: 'Technical Task' | 'User Story',
    description?: string,
    prio: 'Urgent' | 'Medium' | 'Low',
    subtasks?: string [],
    assigned?: Contact [],
    id: string,
}
