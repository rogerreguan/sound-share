import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IAlbum } from 'src/model/interfaces';
import { AlbumsService } from 'src/app/services/albums.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonButton, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, ReactiveFormsModule]
})
export class Tab2Page{

  title: string = '';
  artist: string = '';
  year: number = 1900;
  tracklist: string[] = [];
  rank: number = 0;
  opinion: string = '';

  albums?: IAlbum[];
  albumForm!: FormGroup;

  constructor(private albumsService: AlbumsService) {
    this.getAlbums();
    this.createForm();
  }

  createForm() {
    this.albumForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      artist: new FormControl('', [Validators.required]),
      year: new FormControl(''),
      tracklist: new FormControl('') ,
      rank: new FormControl(''),
      opinion: new FormControl(''),
    });
  }

  saveAlbum() {
    if (this.albumForm.valid){
      const a: IAlbum = {
        title: this.albumForm.get('title')!.value,
        artist: this.albumForm.get('artist')!.value,
        year: +this.albumForm.get('year')!.value,
        tracklist: this.albumForm.get('tracklist')!.value,
        stars: +this.albumForm.get('rank')!.value,
        actiu: true
      }
      this.albumsService.addAlbum(a);
    } else {
      alert('formulari invàlid');
    }
  }

  getAlbums() {
    this.albumsService.getAlbums().subscribe((albums: IAlbum[]) => {
      this.albums = albums;
    });
  }

}
