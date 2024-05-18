import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Ticket } from '../interfaces/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  private readonly storageKey = 'tickets';
  tickets$ = new BehaviorSubject<Ticket[]>(this.loadFromLocalStorage());

  constructor(private http: HttpClient) { }

  private handleError(err: any): Observable<boolean> {
    console.error('An error occurred:', err);
    return of(false);
  }

  private updateItems(items: Ticket[]): void {
    this.tickets$.next(items);
    this.saveToLocalStorage(items);
  }

  private getItems(): Ticket[] {
    return this.tickets$.getValue();
  }

  private loadFromLocalStorage(): Ticket[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private saveToLocalStorage(items: Ticket[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  getAll(): Observable<Ticket[]> {
    return this.tickets$.asObservable();
  }

  get(id: number): Observable<Ticket | undefined> {
    return this.getAll().pipe(
      map(items => items.find(item => item.id == id))
    );
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.apiBaseUrl}/api/ticket/${id}`).pipe(
      tap(success => {
        if (success) {
          const items = this.getItems().filter(item => item.id != id);
          this.updateItems(items);
        }
      }),
      catchError(this.handleError)
    );
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${environment.apiBaseUrl}/api/ticket/${id}`, data).pipe(
      tap(success => {
        if (success) {
          const items = this.getItems().map(item => item.id == id ? {...item, ...success} : item);
          this.updateItems(items);
        }
      }),
      catchError(this.handleError)
    );
  }

  add(payload: Ticket): Observable<boolean> {
    return this.http.post<any>(`${environment.apiBaseUrl}/api/ticket`, payload).pipe(
      map(res => res['result'] || null),
      tap(success => {
        if (success) {
          const lastElem = this.getItems().at(-1)
          success.id =  lastElem && lastElem.id + 1 || 0
          const items = [...this.getItems(), success];
          this.updateItems(items);
        }
      }),
      catchError(this.handleError)
    );
  }
}
