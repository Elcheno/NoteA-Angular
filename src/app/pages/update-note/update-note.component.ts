import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { FormNoteComponent } from 'src/app/components/form-note/form-note.component';
import { iNote } from 'src/app/model/interface';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from 'src/app/services/note.service';


@Component({
  selector: 'app-update-note',
  standalone: true,
  imports: [CommonModule, MatCardModule, FormNoteComponent],
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.css']
})
export class UpdateNoteComponent {

  public note!:iNote;

  constructor(
    private ra:ActivatedRoute,
    private noteService:NoteService,
    private router:Router
    ){}

  ngOnInit(){
    this.ra.params.subscribe(params => {
      if(params){
        let aux = this.noteService.getNote(params['id']);
        if(aux) this.note = aux;
      }
    })
  }

  async onSubmit(note:iNote){
    await this.noteService.updateNote(note);
    this.router.navigate(['notes']);
  } 

}
