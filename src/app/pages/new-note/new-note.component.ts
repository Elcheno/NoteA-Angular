import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormNoteComponent } from 'src/app/components/form-note/form-note.component';
import { iNote } from 'src/app/model/interface';
import { NoteService } from 'src/app/services/note.service';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-new-note',
  standalone: true,
  imports: [CommonModule, FormNoteComponent, MatCardModule],
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.css']
})
export class NewNoteComponent {


  constructor(private noteService:NoteService){}

  onSubmit(note:iNote){
    this.noteService.addNote(note)
  } 
}
