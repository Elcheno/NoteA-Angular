import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { iNote } from 'src/app/model/interface';
import { NoteService } from 'src/app/services/note.service';
import { MatListModule } from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import { Router } from '@angular/router';


@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, SharedModule, MatListModule, MatDividerModule],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {
  public noteList:iNote[] = []

  private noteService = inject(NoteService)

  constructor(private router:Router){
    this.noteService.dataSubject.subscribe(notes => {
      if(notes){
        this.noteList = notes;
      }
    })
  }

  editNoteFn(note:iNote){
    this.router.navigate([`updateNote/${note.id}`]);
  }

  removeNoteFn(note:iNote){
    this.noteList = this.noteList.filter(n => n.id != note.id)
    this.noteService.removeNote(note)
  }
}
