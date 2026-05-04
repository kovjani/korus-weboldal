import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field'; // Új
import { MatInputModule } from '@angular/material/input'; // Új
import { RouterModule } from '@angular/router';
import { EventService } from '../../services/event.service';
import { AuthService } from '../../services/auth.service';
import { BehaviorSubject, combineLatest, map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
  ],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss',
})
export class EventListComponent implements OnInit {
  private eventsSubject = new BehaviorSubject<any[]>([]);
  private searchTermSubject = new BehaviorSubject<string>('');

  // A szűrt lista: figyeljük az eseményeket ÉS a keresőszót is
  filteredEvents$: Observable<any[]> = combineLatest([
    this.eventsSubject.asObservable(),
    this.searchTermSubject.asObservable().pipe(startWith('')),
  ]).pipe(
    map(([events, term]) => {
      if (!term.trim()) return events;

      const t = term.toLowerCase();
      return events.filter(
        (e) =>
          e.title?.toLowerCase().includes(t) ||
          e.place?.toLowerCase().includes(t) ||
          e.description?.toLowerCase().includes(t) ||
          e.date?.toString().includes(t),
      );
    }),
  );

  constructor(
    public eventService: EventService,
    public authService: AuthService,
  ) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getAll().subscribe({
      next: (data: any) => {
        const list = data.events || data;
        this.eventsSubject.next(list);
      },
      error: (err) => console.error('Hiba', err),
    });
  }

  // Ezt hívja meg az input mező
  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTermSubject.next(value);
  }

  deleteEvent(id: string) {
    if (confirm('Biztosan törölni szeretnéd?')) {
      this.eventService.delete(id).subscribe({
        next: () => {
          const updatedEvents = this.eventsSubject.value.filter((e) => e.id !== id);
          this.eventsSubject.next(updatedEvents);
        },
        error: (err) => console.error('Hiba a törlésnél', err),
      });
    }
  }
}
