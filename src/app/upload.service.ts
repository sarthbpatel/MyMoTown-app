import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { UploadModel } from "./models/upload.model";

@Injectable({
    providedIn: 'root'
  })
export class UploadService {
    constructor(private db: AngularFireDatabase) {
    }

    getPic(photo: UploadModel){
        if(!photo) 
            return 0;
        else
            return photo;
    }

    submit(submit: UploadModel) {
        this.db.list<UploadModel>("submit").push(submit);
    }
}