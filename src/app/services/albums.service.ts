import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IAlbum } from 'src/model/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  
  constructor(private firestore: Firestore) { }

  getAlbums() : Observable<IAlbum[]>{

    const colfAlbums = collection(this.firestore, 'albums');
    return collectionData(colfAlbums, {idField: 'id'}) as Observable<IAlbum[]>;
    
  }

  getAlbumById(id: number): Observable<IAlbum>{
    const docfAlbum= doc(this.firestore, `albums/${id}`);
      return docData(docfAlbum, {idField: 'id'}) as Observable<IAlbum>;
  }

  addAlbum(album: IAlbum){
    const colfAlbums = collection(this.firestore, `albums`);
    return addDoc(colfAlbums, album);
  }

  removeAlbum(album: IAlbum){
    const docfAlbum = doc(this.firestore, `albums/${album.id}`);
    return deleteDoc(docfAlbum);
  }
}
