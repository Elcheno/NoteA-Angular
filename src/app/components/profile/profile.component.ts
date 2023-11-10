import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  public user?:User | null;
  public userIMG!:string;

  constructor(
    private userService: UserService,
    private router: Router
  ){} 

  ngOnInit(){
    this.userService.userData$.subscribe((user) => {
      this.user = user;
    });
  }

  logOut(){
    this.userService.singOut()
    .then(() => {
      this.router.navigate(['/login']);
    })
    .catch(err => console.error(err));
  }

}
