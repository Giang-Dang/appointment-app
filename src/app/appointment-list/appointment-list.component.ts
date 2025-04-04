import { Component } from '@angular/core';
import { Appointment } from '../models/appointment';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css'],
})
export class AppointmentListComponent {
  appointments: Appointment[] = [];
  newAppointment: Appointment = { id: 1, title: '', date: new Date() }; // Initialize with default values

  
  ngOnInit(): void {
    this.getAppointmentsFromLocalStorage();
  }

  ngOnDestroy(): void {
    this.saveAppointmentsToLocalStorage();
  }

  addAppointment(): void {
    if(this.newAppointment.title.trim().length && this.newAppointment.date) {
      this.appointments.push({ ...this.newAppointment, id: this.appointments.length + 1 });
      this.newAppointment = { id: 1, title: '', date: new Date() };
    }
    
    this.saveAppointmentsToLocalStorage();
  }

  removeAppointment(appointment: Appointment): void {
    this.appointments = this.appointments.filter((a) => a.id !== appointment.id);

    this.saveAppointmentsToLocalStorage();
  }

  saveAppointmentsToLocalStorage(): void {
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
  }

  getAppointmentsFromLocalStorage(): void {
    const appointments = localStorage.getItem('appointments');
    if (appointments) {
      this.appointments = JSON.parse(appointments);
    }
  }

}
