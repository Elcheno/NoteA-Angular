import { Component, EventEmitter, Input, Output } from '@angular/core';
import { iNote } from 'src/app/model/interface';



@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {
  @Input('note') public note:iNote = {
    id:'',
    title:'',
    description:''
  };

  @Output() 
  updateNote = new EventEmitter<iNote>()


  @Output() 
  removeNote = new EventEmitter<iNote>()

  constructor(){}

  editNoteFn(note:iNote){
    this.updateNote.emit(note)
  }

  removeNoteFn(note:iNote){
    this.removeNote.emit(note)
  }

}
