import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PlanMyNightComponent } from './plan-my-night/plan-my-night.component';
import { CreatePostComponent } from './create-post/create-post.component';

const routes:Routes = [
  {path: 'plan-my-night', component: PlanMyNightComponent},
  {path: 'create-post', component: CreatePostComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
