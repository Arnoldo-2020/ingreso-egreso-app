import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor( private fb: FormBuilder,
               private authService: AuthService,
               private router: Router ) { }

  ngOnInit(){

    this.registerForm = this.fb.group({
      user      : [ '', Validators.required ],
      email     : [ '', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password  : [ '', Validators.required ]
    });


  }

  createUser(){
    
    if( this.registerForm.invalid ){ return; }

    Swal.fire({
      title: 'Wait!',
      didOpen: () => {
        Swal.showLoading()
      }})

    const { user, email, password } = this.registerForm.value;

    this.authService.createUser(user, email, password)
      .then( credenciales => {
        console.log(credenciales);
        Swal.close();
        this.router.navigate(['/']);
      })
      .catch( err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        })
      } );
  }

}
