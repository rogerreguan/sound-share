import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IAlbum, IArtist, IPost } from 'src/model/interfaces';
import { AlbumsService } from 'src/app/services/albums.service';
import { SpotifyService } from 'src/app/services/spotify.service';
import { PostsService } from 'src/app/services/posts.service';

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
  dateTime: Date = new Date();
  
  postForm!: FormGroup;

  artist?: string;
  artists?: IArtist[];

  album?: string;
  albums?: Object[];

  constructor(private postsService: PostsService, private spotifyService: SpotifyService) {
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

  //getTime() {
  //  let dateTime  = new Date();
  //  console.log(dateTime);
  //  return dateTime;
  //}

  createForm() {
    this.postForm = new FormGroup({
      album: new FormControl('', [Validators.required]),
      artist: new FormControl('', [Validators.required]),
      year: new FormControl(''),
      tracklist: new FormControl('') ,
      stars: new FormControl(''),
      opinion: new FormControl(''),
    });
  }

  savePost() {
    if (this.postForm.valid){
      const a: IPost = {
        // title: this.albumForm.get('title')!.value,
        // artist: this.postForm.get('artist')!.value,
        // year: +this.postForm.get('year')!.value,
        // tracklist: this.postForm.get('tracklist')!.value,
        stars: +this.postForm.get('stars')!.value,
        opinion: this.postForm.get('opinion')!.value,
        //album: this.albums?.[0],
        // dateTime: new Date(),
        // date: this.dateTime.getDay(),
        // actiu: true
      }
      console.log(a.date);
      this.postsService.addPost(a);
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
