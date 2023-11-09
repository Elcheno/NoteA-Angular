import { Component } from '@angular/core';
import { MatSnackBar} from '@angular/material/snack-bar';
import { UserService } from './services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'notea2';

  userName!:string;

  constructor(
    private userService:UserService,
    private _snackBar: MatSnackBar
  ){}

  ngOnInit(){
    this.userService.userData$.subscribe((user) => {
      if(user && user['displayName']){
        this.userName = user['displayName'];
        this._snackBar.open(`Bienvenido ${this.userName}`, 'cerrar');
      }
    })
  }

}
