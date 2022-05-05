import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { ViewEventLayoutComponent } from './view-event-layout/view-event-layout.component';
import { PostComponent } from './post/post.component';
import { AttendanceCounterComponent } from './attendance-counter/attendance-counter.component';
import { RatingComponent } from './rating/rating.component';
import { FilterComponent } from './filter/filter.component';
import { HeaderLayoutComponent } from './header-layout/header-layout.component';
import { HttpClientModule } from '@angular/common/http';
import { UploadComponent } from './post/upload/upload.card';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { firebaseConfig } from 'src/environments/environment';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { AuthBackgroundComponent } from './auth-background/auth-background.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpLayoutComponent } from './sign-up-layout/sign-up-layout.component';
import { PlanMyNightComponent } from './plan-my-night/plan-my-night.component';
import { AppRoutingModule } from './app-routing.module';
import { YourEventsLayoutComponent } from './your-events-layout/your-events-layout.component';
import { CreatePostComponent } from './create-post/create-post.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeLayoutComponent,
    ViewEventLayoutComponent,
    PostComponent,
    AttendanceCounterComponent,
    RatingComponent,
    FilterComponent,
    HeaderLayoutComponent,
    UploadComponent,
    LoginLayoutComponent,
    AuthBackgroundComponent,
    SignUpLayoutComponent,
    PlanMyNightComponent,
    YourEventsLayoutComponent,
    CreatePostComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeLayoutComponent },
      { path: 'view-event/:id', component: ViewEventLayoutComponent },
      { path: 'login', component: LoginLayoutComponent },
      { path: 'signup', component: SignUpLayoutComponent },
      { path: 'upload', component: UploadComponent },
      { path: 'account', component: YourEventsLayoutComponent }
     // more pages to be implemented
    ]),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ScrollingModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
