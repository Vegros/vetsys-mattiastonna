import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/Auth.service';
import { AuthDto } from '../../dto/Auth.dto';
import {StatusDto} from '../../dto/Status.dto';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private loginService: AuthService, private router: Router) {
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    console.log(JSON.stringify(this.loginForm.value));
    const login: AuthDto = this.loginForm.value;
    this.loginService.login(login).subscribe((status: StatusDto) => {
      localStorage.setItem("token", status.jwtToken);
      localStorage.setItem("role", status.role);
      localStorage.setItem("username", status.username)
      console.log(JSON.stringify(status));

      this.router.navigate(["/home"]);
    },error =>{
      console.error("Login failed", error);
    });
  }

  shouldProcessControlValidationMessages(controlName: string) {
    let control = this.loginForm.get(controlName);
    return ((control!.touched || control!.dirty) && control!.errors);
  }
}
