export class EventListController {
  private deleteButtons = document.querySelectorAll('.delete-btn');

  constructor() {
    this.deleteButtons.forEach((btn: Element) => {
      btn.addEventListener('click', (e: Event) => {
        this.deleteBtnCallback(e, btn);
      });
    });
  }

  private deleteBtnCallback = async (event: Event, button: Element) => {
    const eventId = button.getAttribute('data-id');

    if (!confirm('Biztosan törölni szeretnéd ezt az eseményt?')) {
      return;
    }

    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const resData = await response.json();

      if (response.ok) {
        location.reload();
      } else {
        alert(resData.error);
      }
    } catch (error) {
      console.error(error);
      alert('Szerver hiba.');
    }
  };
}
