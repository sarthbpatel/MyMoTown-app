import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  
  constructor(public http: HttpClient, public db: AngularFireDatabase) { }

  getAll<T>(endpointUrl: string) {
    return this.db.list<T>(endpointUrl).valueChanges();
  }

  getItem<T>(endpointUrl: string, key: string | number) {
    return this.db.object<T>(`${endpointUrl}/${key}`).valueChanges();
  }

  async pushItem<T>(endpointUrl: string, item: T) {
    let index = (await firstValueFrom(this.getAll(endpointUrl))).length;

    this.db.list<T>(endpointUrl).set(`${index}`, item);
  }

  setItem<T>(endpointUrl: string, key:string, item: T)
  {
    this.db.list<T>(endpointUrl).set(key, item);
  }

  updateItem<T>(endpointUrl: string, key:string, item: T) {
    this.db.list<T>(endpointUrl).update(key, item);
  }
}
