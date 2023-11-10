import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, User, setPersistence, browserSessionPersistence } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userData$ = new BehaviorSubject<User | null>(null);
  public isLogger = false;
  private _userData:User | null = this.authService.currentUser;
  

  constructor(
    private authService: Auth,
    private router: Router
  ) {
    this.authService.onAuthStateChanged((user) => {
      this._userData = user;
      this.userData$.next(this._userData);
      if(user){
        this.isLogger = true;
        // this.router.navigate(['/notes']);
      }
      else this.isLogger = false;
    })

  }

  getUserData():User | null{
    return this._userData;
  }

  async logInWithGoogle(){
    return await this.authService.setPersistence(browserSessionPersistence)
    .then(() => signInWithPopup(this.authService, new GoogleAuthProvider())) 
  }

  async singOut(){
    return await this.authService.signOut();
  }
}
