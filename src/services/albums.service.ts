import { Injectable } from '@angular/core';
import { IAlbum } from '../model/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  public albums: IAlbum[] = [];

  constructor() { }

  addAlbum(album: IAlbum): boolean {
    this.albums.push(album);
    localStorage.setItem('albums', JSON.stringify(this.albums));
    return true;
  }

  getAlbumById(id: string) {
    return null;
  }

  getAlbums() {
    if (localStorage.getItem('albums') == undefined) {
      return this.albums;
    } else {
      this.albums = JSON.parse(localStorage.getItem('albums')!);
      return this.albums;
    }
    
  }

  removeAlbum(id: string) {
    return null
  }
}