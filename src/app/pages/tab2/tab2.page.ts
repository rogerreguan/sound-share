import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IAlbum, IArtist } from 'src/model/interfaces';
import { AlbumsService } from 'src/app/services/albums.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonButton, IonHeader, IonToolbar, IonTitle, IonContent, ReactiveFormsModule]
})
export class Tab2Page{

  // title: string = '';
  // artist: string = '';
  // year: number = 1900;
  // tracklist: string[] = [];
  // rank: number = 0;
  // opinion: string = '';
  albumForm!: FormGroup;

  artist?: string;
  artists?: IArtist[];

  album?: string;
  albums?: Object[];

  constructor(private albumsService: AlbumsService, private spotifyService: SpotifyService) {
    this.createForm();
  }

  onInputChangeArtist(): void {
    console.log('Nuevo valor:', this.artist);
    this.artist!=null? this.getArtists(this.artist): console.log("nada");
  }

  onInputChangeAlbum(): void {
    console.log('Nuevo valor:', this.album);
    this.album!=null? this.getAlbums(this.album): console.log("nada");
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

  getAlbums(album: string) {
    this.spotifyService.getAlbum(album).subscribe((albums: Object[]) => {
      this.albums = albums;
      console.log(this.albums);
    });

  }

  getArtists(artist: string) {
    this.spotifyService.getArtist(artist).subscribe((artists: IArtist[]) => {
      this.artists = artists;
      console.log(this.artists);
    });

  }

  

}
