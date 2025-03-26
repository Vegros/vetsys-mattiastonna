export class Appointment {


  private _appointmentId: number;
  private _patientName: string;
  private _animalType: string;
  private _ownerIdCardNumber: string;
  private _ownerName: string;
  private _ownerSurname: number;
  private _ownerContactNumber: number;
  private _appointmentDate: string;
  private _appointmentTime: string;
  private _appointmentDuration: string;
  private _reasonForAppointment: string;
  private _vetNotes: string;

  constructor (
    appointmentId: number,
    patientName: string,
    animalType: string,
    ownerIdCardNumber: string,
    ownerName: string,
    ownerSurname: number,
    ownerContactNumber: number,
    appointmentDate: string,
    appointmentTime: string,
    appointmentDuration: string,
    reasonForAppointment: string,
    vetNotes: string
  ){
    this._appointmentId = appointmentId;
    this._patientName = patientName;
    this._animalType = animalType;
    this._ownerIdCardNumber = ownerIdCardNumber;
    this._ownerName = ownerName;
    this._ownerSurname = ownerSurname;
    this._ownerContactNumber = ownerContactNumber;
    this._appointmentDate = appointmentDate;
    this._appointmentTime = appointmentTime;
    this._appointmentDuration = appointmentDuration;
    this._reasonForAppointment = reasonForAppointment;
    this._vetNotes = vetNotes;
  }


  get vetNotes(): string {
    return this._vetNotes;
  }

  set vetNotes(value: string) {
    this._vetNotes = value;
  }
  get reasonForAppointment(): string {
    return this._reasonForAppointment;
  }

  set reasonForAppointment(value: string) {
    this._reasonForAppointment = value;
  }
  get appointmentDuration(): string {
    return this._appointmentDuration;
  }

  set appointmentDuration(value: string) {
    this._appointmentDuration = value;
  }
  get appointmentTime(): string {
    return this._appointmentTime;
  }

  set appointmentTime(value: string) {
    this._appointmentTime = value;
  }
  get appointmentDate(): string {
    return this._appointmentDate;
  }

  set appointmentDate(value: string) {
    this._appointmentDate = value;
  }
  get ownerContactNumber(): number {
    return this._ownerContactNumber;
  }

  set ownerContactNumber(value: number) {
    this._ownerContactNumber = value;
  }
  get ownerSurname(): number {
    return this._ownerSurname;
  }

  set ownerSurname(value: number) {
    this._ownerSurname = value;
  }
  get ownerName(): string {
    return this._ownerName;
  }

  set ownerName(value: string) {
    this._ownerName = value;
  }
  get ownerIdCardNumber(): string {
    return this._ownerIdCardNumber;
  }

  set ownerIdCardNumber(value: string) {
    this._ownerIdCardNumber = value;
  }
  get animalType(): string {
    return this._animalType;
  }

  set animalType(value: string) {
    this._animalType = value;
  }
  get patientName(): string {
    return this._patientName;
  }

  set patientName(value: string) {
    this._patientName = value;
  }
  get appointmentId(): number {
    return this._appointmentId;
  }

  set appointmentId(value: number) {
    this._appointmentId = value;
  }
}
