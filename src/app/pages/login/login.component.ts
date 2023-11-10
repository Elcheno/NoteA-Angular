import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private userService:UserService,
    private router:Router
  ){}


  loginGoogle(){
    this.userService.logInWithGoogle()
      .then(() => {
        this.router.navigate(['/notes']);
      })
      .catch(err => console.error(err));
  }

}
