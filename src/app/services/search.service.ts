import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SearchService {
  constructor() {}
  private searchTerm = new BehaviorSubject<string>('');
  searchTerm$ = this.searchTerm.asObservable(); 

  /**
   * sets a term we search for
   * @param term - the searchTerm
   */

  setSearchTerm(term: string) {
    this.searchTerm.next(term); 
  }
}
