import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, User } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userData$ = new BehaviorSubject<User | null>(null);
  public isLogger = false;
  private _userData:User | null = this.authService.currentUser;
  

  constructor(
    private authService: Auth
  ) {}

  ngOnInit(){
    // onAuthStateChanged(this.authService, (user) => {
    //   console.log('cambio')
    //   if(user){
    //     console.log('algo a cambiado');
    //     this._userData = user;
    //   }
    // })
  }

  getUserData():User | null{
    return this._userData;
  }

  async logInWithGoogle(){
    return await signInWithPopup(this.authService, new GoogleAuthProvider());
  }

  async singOut(){
    return await this.authService.signOut();
  }

  setUserData(){
    setTimeout(() => {
      this._userData = this.authService.currentUser;
      this.userData$.next(this._userData);
      if(this._userData!=null)this.isLogger = true;
      else this.isLogger = false;
    }, 500);
  }

}
