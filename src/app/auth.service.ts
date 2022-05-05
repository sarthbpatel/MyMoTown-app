import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { FirebaseService } from './firebase.service';
import { UserModel } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: UserModel | null = null;

  constructor(public afAuth: AngularFireAuth, private firebaseService: FirebaseService, private router: Router) {
    this.afAuth.authState.subscribe((userData) => {
      if(userData) {
        this.setUser(userData);
      } else {
        this.setUser(null);
      }
    });
  }

  signUp(email: string, password: string) {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.setUser(result.user);

        if(this.user) {
          this.firebaseService.setItem<UserModel>("Users", this.user.uid, this.user);
        }
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  login(email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.setUser(result.user);
      })
      .catch((error) => {
        window.alert("Invalid username or password");
      });
  }

  signOut() {
    this.afAuth
      .signOut()
      .then(() => {
        this.setUser(null);
      });
  }

  async setUser(userData: any) {
    if(userData) {
      let firebaseUserData = await this.getFirebaseUser(userData);

      if(!firebaseUserData) {
        firebaseUserData = {
          uid: userData.uid,
          email: userData.email,
          isAdmin: false,
          isFlagged: false,
          banTime: 0,
          attendingPosts: []
        };
      }

      this.user = {
        uid: userData.uid,
        email: userData.email,
        isAdmin: firebaseUserData.isAdmin,
        isFlagged: firebaseUserData.isFlagged,
        banTime: firebaseUserData.banTime,
        attendingPosts: firebaseUserData.attendingPosts
      };
    } else {
      this.user = null;
    }
  }

  async getFirebaseUser(userData: any): Promise<UserModel | null> {
    if(userData) {
      return (await firstValueFrom(this.firebaseService.getItem<UserModel>("Users", userData.uid)));
    }

    return null;
  }

}
