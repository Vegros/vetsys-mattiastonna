
export class StatusDto {
  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }
  private _jwtToken: string;
  private _message: string;
  private _username: string;
  private _role: string;

  constructor(jwtToken: string, message: string, role: string, username: string) {
    this._jwtToken = jwtToken;
    this._message = message;
    this._role = role;
    this._username = username
  }
  get role(): string {
    return this._role;
  }

  set role(value: string) {
    this._role = value;
  }
  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }
  get jwtToken(): string {
    return this._jwtToken;
  }

  set jwtToken(value: string) {
    this._jwtToken = value;
  }



}
