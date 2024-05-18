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

  clear(): void {
    this.updateItems([]);
    localStorage.removeItem(this.storageKey);
  }

  getAll(): Observable<Ticket[]> {
    return this.tickets$.asObservable();
  }

  get(id: number): Observable<Ticket | undefined> {
    return this.getAll().pipe(
      map(items => items.find(item => item.id === id))
    );
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.apiBaseUrl}/api/ticket/${id}`).pipe(
      tap(success => {
        if (success) {
          const items = this.getItems().filter(item => item.id !== id);
          this.updateItems(items);
        }
      }),
      catchError(this.handleError)
    );
  }

  fetchItem(id: number): Observable<Ticket | null> {
    // @ts-ignore
    return this.http.get<any>(`${environment.apiBaseUrl}/api/ticket/${id}`).pipe(
      map(response => response['success'] ? response['result'] : null),
      catchError(this.handleError)
    );
  }

  update(id: number, payload: Ticket): Observable<boolean> {
    return this.http.put<boolean>(`${environment.apiBaseUrl}/api/ticket/${id}`, payload).pipe(
      tap(success => {
        if (success) {
          const items = this.getItems().map(item => item.id === id ? payload : item);
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
          const items = [...this.getItems(), success];
          this.updateItems(items);
        }
      }),
      catchError(this.handleError)
    );
  }

  fetch(): Observable<boolean> {
    return this.http.get<any>(`${environment.apiBaseUrl}/api/tickets`).pipe(
      map(response => response['result'] || []),
      tap(items => this.updateItems(items)),
      catchError(this.handleError)
    );
  }
}
