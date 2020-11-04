import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import {HttpClientModule} from '@angular/common/http';
import { AddChorePage } from './add-chore.page';

const routes: Routes = [
  {
    path: '',
    component: AddChorePage
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
  declarations: [AddChorePage]
})
export class AddChorePageModule {}
