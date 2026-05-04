import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EventService } from '../../services/event.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.scss',
})
export class EventFormComponent implements OnInit{

  form: FormGroup;
  editId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private eventService: EventService,
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      place: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit() {
    this.editId = this.route.snapshot.paramMap.get('id');

    if (this.editId) {
      this.eventService.getById(this.editId).subscribe({
        next: (res: any) => {
          if (res.success && res.event) {
            const eventData = res.event;
            console.log(eventData);
            this.patchForm(eventData);
          }
        },
        error: (err) => console.error('Hiba az adatok lekérésekor:', err)
      });
    }
  }

  submit() {
    if (this.form.valid) {
      const rawData = { ...this.form.value };

      if (rawData.date) {
        rawData.date = rawData.date.split('T')[0];
      }

      if (this.editId) {
        rawData.id = this.editId;
        this.eventService.update(rawData).subscribe({
          next: (response) => {
            console.log('Sikeres mentés:', response);
            this.router.navigate(['/event-list']);
          },
          error: (err) => {
            console.error('Hiba történt a mentés során:', err);
            alert('Hiba történt a mentéskor.');
          },
        });
      } else {
        this.eventService.create(rawData).subscribe({
          next: (response) => {
            console.log('Sikeres mentés:', response);
            this.router.navigate(['/event-list']);
          },
          error: (err) => {
            console.error('Hiba történt a mentés során:', err);
            alert('Hiba történt a mentéskor.');
          },
        });
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  private patchForm(eventData: any) {
    this.form.patchValue({
      title: eventData.title,
      place: eventData.place,
      date: eventData.date?.split('T')[0],
      description: eventData.description,
    });
  }
}
