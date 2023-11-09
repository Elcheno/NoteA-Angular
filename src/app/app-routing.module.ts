import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { E404Component } from './pages/e404/e404.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo:'home'},
  {title:'Inicio', path:'home', component:HomeComponent},
  {title:'Notas', path:'notes', 
  loadComponent:() => import('./pages/notes/notes.component').then(m => m.NotesComponent),
  canActivate:[authGuard]
  },
  {title:'Nueva nota', path:'newNote',
  loadComponent:() => import('./pages/new-note/new-note.component').then(m => m.NewNoteComponent),
  canActivate:[authGuard]
  },
  {title:'Actualizar nota', path:'updateNote/:id',
  loadComponent:() => import('./pages/update-note/update-note.component').then(m => m.UpdateNoteComponent),
  canActivate:[authGuard]
  },
  {title:'Acerca de', path:'about',
  loadComponent:() => import('./pages/about/about.component').then(m => m.AboutComponent)
  },
  {title:'Login', path:'login', component:LoginComponent},
  {path:'**', component:E404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
