import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from 'app/services/index';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';


@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  rForm: FormGroup;
  post: any;
  username: string;
  password: string;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {

    this.rForm = fb.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required]
    });

  }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }

  login(post) {
    this.loading = true;
    this.authenticationService.login(post)
      .subscribe(result => {
        if (result === true) {
          // login successful
          this.router.navigate(['/']);
        } else {
          // login failed
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      });
  }
}

