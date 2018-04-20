import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required)
  });
  constructor(private apiservice: ApiService, private router: Router) { }

  submit(f) {

    console.log(f.value);
    if (f.valid) {
      this.apiservice.login(f.value).subscribe(res => {
        console.log(res.json().data);
        const token = res.json().data.token;
        this.apiservice.saveToken(token);
        this.router.navigateByUrl('');
      });
    }

  }
  ngOnInit() {
  }

}
