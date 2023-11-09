import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteComponent } from 'src/app/components/note/note.component';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [NoteComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  exports:[NoteComponent]
})
export class SharedModule { }
