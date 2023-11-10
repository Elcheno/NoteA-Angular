import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, User, setPersistence, browserSessionPersistence } from '@angular/fire/auth';
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
  ) {
    console.log('hola')
    //setTimeout(() => {
    //  const aux:User | null = JSON.parse(localStorage.getItem('user')!);
    //  if(aux) console.log(aux);
    //},1000)

    this.authService.onAuthStateChanged((user) => {
      this._userData = user;
      this.userData$.next(this._userData);
    })

  }

  ngOnInit(){
    // onAuthStateChanged(this.authService, (user) => {
    //   console.log('cambio')
    //   if(user){
    //     console.log('algo a cambiado');
    //     this._userData = user;
    //   }
    // })

    //setPersistence(this.authService, browserLocalPersistence)
    //.then(() => {
    //  console.log('token valido')
    //  //return signInWithPopup(this.authService, new GoogleAuthProvider())
    //}).catch(err => console.error(err))

    //console.log(sessionStorage.getItem('firebase:authUser:AIzaSyDYSrkQERa4IaPR-rPWBfc6NTWsip7jvho:[DEFAULT]'))
  }

  getUserData():User | null{
    return this._userData;
  }

  async logInWithGoogle(){
    return await this.authService.setPersistence(browserSessionPersistence)
    .then(() => signInWithPopup(this.authService, new GoogleAuthProvider())) 
    //signInWithPopup(this.authService, new GoogleAuthProvider());
  }

  async singOut(){
    return await this.authService.signOut();
  }

  setUserData(){
    setTimeout(() => {
      this._userData = this.authService.currentUser;
      this.userData$.next(this._userData);
      if(this._userData!=null){
        this.isLogger = true;
        //localStorage.setItem('user', JSON.stringify(this._userData));
      }
      else{
        this.isLogger = false;
        //localStorage.setItem('user', 'null');
      } 
    }, 500);
  }

}
