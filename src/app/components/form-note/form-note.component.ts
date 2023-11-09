import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { iNote } from 'src/app/model/interface';

@Component({
  selector: 'app-form-note',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './form-note.component.html',
  styleUrls: ['./form-note.component.css']
})
export class FormNoteComponent {

  @Input() note!:iNote;
  public form:FormGroup;

  @Output() onSubmit = new EventEmitter<iNote>()

  constructor(private fb:FormBuilder){
    this.form = this.fb.group({
      id:0,
      title:['', [Validators.required, Validators.maxLength(20)]],
      description:['']
    })
  }

  ngOnInit(){
    if(this.note && this.note.title){
      this.form.setValue(this.note)
    }
  }

  submit(){
    this.onSubmit.emit({
      id: this.form.value.id,
      title: this.form.value.title,
      description: this.form.value.description
    })
    this.reset()
  }

  reset(){
    this.form.reset()
  }


}
