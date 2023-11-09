import { Component } from '@angular/core';
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
    private userService: UserService
  ){} 

  ngOnInit(){
    this.userService.userData$.subscribe((user) => {
      this.user = user;
    });
  }

  logOut(){
    this.userService.singOut()
    .then(() => {
      this.userService.setUserData();
    })
    .catch(err => console.error(err));
  }

}
