import { Contact } from "./contact";

export interface Task {
    title: string,
    date: string,
    status: 'toDo' | 'inProgress' | 'awaitFeedback' | 'done',
    category: 'technical task' | 'user story',
    description?: string,
    prio: 'urgent' | 'medium' | 'low',
    subtasks?: string [],
    assigned?: Contact [],
    id: string,
}
