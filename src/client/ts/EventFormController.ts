export class EventFormController {
  private eventForm = document.querySelector('event-form') as HTMLFormElement;

  constructor() {
    this.eventForm.addEventListener('submit', this.formSubmitCallback);
  }

  private formSubmitCallback = async (event: Event) => {
    console.log('HELLO');
    event.preventDefault();

    const id = document.querySelector('event-id').getAttribute('value');
    const isNew = id == '0';

    const formData = new FormData(this.eventForm);
    const data = Object.fromEntries(formData.entries());

    const url = isNew ? '/api/events' : `/api/events/${id}`;
    const method = isNew ? 'POST' : 'PUT';

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (response.ok) {
        window.location.href = '/api/events';
      } else {
        alert(resData.error);
      }
    } catch (error) {
      console.error(error);
      alert('Szerver hiba.');
    }
  };
}
