import { Injectable } from '@angular/core';
import { iNote } from '../model/interface';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference  } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private _data:iNote[] = [] // Array donde almacenaremos todas las notas en nuestro servicio
  private _userData:User | null = null;
  private _notesRef!: AngularFirestoreCollection<any>; // Variable donde injectaremos la asociación de la db, atacaremos a esta variable para acceder a la db
  public dataSubject = new BehaviorSubject<iNote[] | null>([]);

  constructor(
    private db: AngularFirestore,
    private userService: UserService
    ) {
    
    this.userService.userData$.subscribe((user) => {
      this._userData = user;
      this._data = [];

      if(user){
        let _dbPath = `/${this._userData?.uid}`;
        this._notesRef = this.db.collection(_dbPath);

        this._notesRef.get().subscribe(res => {
          let docs = res.docs;
          this._data = docs.map( response => {
            return {id:response.id,...response.data()}
          })
          this.dataSubject.next(this._data);
        })
      }
    })
  }

  ngOnInit(){
    let _dbPath = `/${this._userData?.uid}`; // Ruta del documento de la db

    this._notesRef = this.db.collection(_dbPath); // Asociación a la db

    // Cargar todas las notas del servidor
    this._notesRef.get().subscribe(res => {
      let docs = res.docs;
      this._data = docs.map( response => {
        return {id:response.id,...response.data()}
      })
      this.dataSubject.next(this._data);
    })
  }

  public async addNote(note:iNote){
    try{
      let {id, ...newNoteWithoutID} = note; // Sacamos el id de la nota para guardarla dentro de la db sin ese atributo
      let dRef:DocumentReference<any> = await this._notesRef.add({...newNoteWithoutID}); // En esta linea guardamos la nota dentro de la db y sacamos la referencia de la misma
      note.id = dRef.id; // Mediante la referencia anterior sacamos el id que le a puesto la base de datos por defecto para poder tenerlo en el objeto
      this._data.push(note); // guardamos la nueva nota en nuestra lista de notas para que se renderize
    }catch(err){
      console.error(err);
    }
  }

  public async updateNote(note:iNote){
    try{
      let {id, ...noteWithoutID} = note;
      await this._notesRef.doc(note.id).update(noteWithoutID);
      this._data = this._data.map(n => n.id != note.id?n:note);
      this.dataSubject.next(this._data);
    }catch(err){
      console.error(err);
    }
  }

  async removeNote(note:iNote){
    try{
      await this._notesRef.doc(note.id).delete();
      this._data = this._data.filter(n => n.id!=note.id);
      this.dataSubject.next(this._data);
    }catch(err){
      console.error(err);
    }

  }

  getNotes():iNote[]{
    return this._data
  }

  getNote(id:string){
    return this._data.find(note => note.id === id);
  }
}