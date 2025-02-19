import { Contact } from "./contact";

export interface Task {
    title: string,
    date: string,
    category: 'Technical Task' | 'User Story',
    description: string,
    prio: 'Urgent' | 'Medium' | 'Low',
    subtasks: string [],
    assigned: Contact [],
}
