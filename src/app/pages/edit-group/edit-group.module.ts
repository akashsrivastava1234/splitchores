import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import {HttpClientModule} from '@angular/common/http';
import { EditGroupPage } from './edit-group.page';

const routes: Routes = [
  {
    path: '',
    component: EditGroupPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditGroupPage]
})
export class EditGroupPageModule {}
