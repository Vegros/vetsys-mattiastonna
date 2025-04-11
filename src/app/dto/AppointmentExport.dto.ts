export class AppointmentExportDto {

  private _id: number;
  private _patientName: string;
  private _animalType: string;
  private _ownerFullName: string;
  private _ownerIdCardNumber: string;
  private _ownerContactNumber: number;
  private _appointmentDateTime: string;
  private _durationMinutes: number;
  private _reasonForAppointment: string;
  private _vetNotes: string;
  private _status: string;
  constructor(
     id: number,
     patientName: string,
     animalType: string,
     ownerFullName: string,
     ownerIdCardNumber: string,
     ownerContactNumber: number,
     appointmentDateTime: string,
     durationMinutes: number,
     reasonForAppointment: string,
     vetNotes: string,
     status: string
  ) {

    this._id = id;
    this._patientName = patientName;
    this._animalType = animalType;
    this._ownerFullName = ownerFullName;
    this._ownerIdCardNumber = ownerIdCardNumber;
    this._ownerContactNumber = ownerContactNumber;
    this._appointmentDateTime = appointmentDateTime;
    this._durationMinutes = durationMinutes;
    this._reasonForAppointment = reasonForAppointment;
    this._vetNotes = vetNotes;
    this._status = status;
  }
  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }
  get patientName(): string {
    return this._patientName;
  }

  set patientName(value: string) {
    this._patientName = value;
  }
  get animalType(): string {
    return this._animalType;
  }

  set animalType(value: string) {
    this._animalType = value;
  }
  get ownerFullName(): string {
    return this._ownerFullName;
  }

  set ownerFullName(value: string) {
    this._ownerFullName = value;
  }
  get ownerIdCardNumber(): string {
    return this._ownerIdCardNumber;
  }

  set ownerIdCardNumber(value: string) {
    this._ownerIdCardNumber = value;
  }
  get ownerContactNumber(): number {
    return this._ownerContactNumber;
  }

  set ownerContactNumber(value: number) {
    this._ownerContactNumber = value;
  }
  get appointmentDateTime(): string {
    return this._appointmentDateTime;
  }

  set appointmentDateTime(value: string) {
    this._appointmentDateTime = value;
  }
  get durationMinutes(): number {
    return this._durationMinutes;
  }

  set durationMinutes(value: number) {
    this._durationMinutes = value;
  }
  get reasonForAppointment(): string {
    return this._reasonForAppointment;
  }

  set reasonForAppointment(value: string) {
    this._reasonForAppointment = value;
  }
  get vetNotes(): string {
    return this._vetNotes;
  }

  set vetNotes(value: string) {
    this._vetNotes = value;
  }
  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }

  Export() {
    return {
      ID: this.id,
      PatientName: this.patientName,
      AnimalType: this.animalType,
      OwnerFullName: this.ownerFullName,
      ownerIdCardNumber: this.ownerIdCardNumber,
      ownerContactNumber: this.ownerContactNumber,
      AppointmentDateTime: this.appointmentDateTime,
      DurationMinutes: this.durationMinutes,
      reasonForAppointment: this.reasonForAppointment,
      VetNotes: this.vetNotes,
      Status: this.status
    };
  }
}
