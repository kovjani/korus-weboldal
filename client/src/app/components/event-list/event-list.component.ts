import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { EventService } from '../../services/event.service';
import { AuthService } from '../../services/auth.service';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss',
})
export class EventListComponent implements OnInit {
  private eventsSubject = new BehaviorSubject<any[]>([]);

  events$ = this.eventsSubject.asObservable();

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

  deleteEvent(id: string) {
    if (confirm('Biztosan törölni szeretnéd?')) {
      this.eventService.delete(id).subscribe({
        next: () => {
          const currentEvents = this.eventsSubject.value;
          const updatedEvents = currentEvents.filter((e) => e.id !== id);

          this.eventsSubject.next(updatedEvents);

          console.log('Esemény törölve a helyi listából is');
        },
        error: (err) => console.error('Hiba a törlésnél', err),
      });
    }
  }
}
