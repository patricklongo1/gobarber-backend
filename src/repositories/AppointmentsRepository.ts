import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public index(): Appointment[] {
    return this.appointments;
  }

  public findByDate(date: Date): Appointment | null {
    const foundAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );

    return foundAppointment || null;
  }

  public store({ provider, date }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({
      date,
      provider,
    });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentRepository;
