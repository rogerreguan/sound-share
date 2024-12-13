import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonSearchbar, IonList, IonItem, IonText, IonTextarea, IonCheckbox } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IAlbum, IArtist, ILocation, IPost, IProfile } from 'src/model/interfaces';
import { AlbumsService } from 'src/app/services/albums.service';
import { SpotifyService } from 'src/app/services/spotify.service';
import { PostsService } from 'src/app/services/posts.service';
import { CommonModule } from '@angular/common';
import { ProfileService } from 'src/app/services/profile.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonCheckbox, IonTextarea, IonText, IonItem, IonList, IonSearchbar, IonInput, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, ReactiveFormsModule, CommonModule]
})
export class Tab2Page {

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
  albumSelected?: IAlbum;
  albums?: IAlbum[];

  test?: string = '';

  uprofile?: IProfile;

  ListPosts?: IPost[];

  CurrentLocation?: ILocation;

  constructor(private postsService: PostsService, private spotifyService: SpotifyService, private profileService: ProfileService) {
    this.createForm();
    this.getUserProfile();
    this.postForm.get('location')?.valueChanges.subscribe((isChecked: boolean) => {
      if (isChecked) {
        this.locateUser();
      } else {
        // Si está desmarcado, remover el campo adicional
        this.CurrentLocation = {x:0, y:0};
      }
    });
  }

  onInputChangeArtist(): void {
    console.log('Nuevo valor:', this.artist);
    this.artist != null ? this.getArtistList(this.artist) : console.log("nada");
  }

  onInputChangeAlbum(): void {
    //console.log('Nuevo valor:', this.postForm.get('searcher')!.value);
    this.postForm.get('album')!.value != null ? this.getAlbumList(this.postForm.get('album')!.value) : console.log("nada");
  }

  //getTime() {
  //  let dateTime  = new Date();
  //  console.log(dateTime);
  //  return dateTime;
  //}

  createForm() {
    this.postForm = new FormGroup({
      album: new FormControl(''),
      //artist: new FormControl('', [Validators.required]),
      year: new FormControl(''),
      tracklist: new FormControl(''),
      stars: new FormControl(+'', [Validators.required, Validators.max(5)]),
      opinion: new FormControl('', [Validators.required, Validators.maxLength(144)]),
      location: new FormControl(false),
      
    });
  }

  savePost() {
    if (this.postForm.valid) {
      console.log(this.CurrentLocation);
      const a: IPost = {
        // title: this.albumForm.get('title')!.value,
        // artist: this.postForm.get('artist')!.value,
        // year: +this.postForm.get('year')!.value,
        // tracklist: this.postForm.get('tracklist')!.value,
        //id: this.generateRandomId(),
        stars: +this.postForm.get('stars')!.value,
        opinion: this.postForm.get('opinion')!.value,
        album: this.albumSelected!,
        user: this.uprofile?.username,
        location: this.CurrentLocation
        // dateTime: new Date(),
        // date: this.dateTime.getDay(),
        // actiu: true
      }
      //console.log(a.date);
      
      this.postsService.addPost(a);
      alert("Post published.");
      this.postForm.reset();
      this.albumSelected = undefined;
    } else {
      alert('formulari invàlid');
    }
  }

  getAlbum(albumid: string) {
    if (albumid) {
      this.spotifyService.getAlbumbyID(albumid).then(value => { this.albumSelected = value })
      this.albums = undefined;
      this.postForm.get('album')?.setValue('');
    } else {
      console.log("No se ha encontrado el id");
    }
  }

  getAlbumList(album: string) {

    if (album) {
      this.spotifyService.getAlbumList(album).subscribe((albums: IAlbum[]) => {
        this.albums = albums;
        console.log(this.albums);
      });
    }

  }

  getArtistList(artist: string) {
    this.spotifyService.getArtistList(artist).subscribe((artists: IArtist[]) => {
      this.artists = artists;
      console.log(this.artists);
    });
  }

  getUserProfile() {
    this.profileService.getUserProfile()?.subscribe((uprofile) => {
      uprofile ? this.uprofile = uprofile : console.log("no user logged");
    });
  }

  getPosts() {
    this.postsService.getPosts().subscribe((posts: IPost[]) => {
      this.ListPosts = posts;
    });
  }

  locateUser() {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
        const currentlocation: ILocation = {
          x:position.coords.latitude,
          y:position.coords.longitude
        };
        console.log(currentlocation);
        this.CurrentLocation = currentlocation;
      },
      (error)=>{
        console.error('Error obteniendo la ubicación:', error);
        alert('No se pudo obtener la ubicación. Asegúrate de habilitar la geolocalización.');
      }
    )
    }else {
      alert('La geolocalización no es compatible con este navegador.');
    }
  }

  // generateRandomId(): string {
  //   this.getPosts();
  //   let idUsedPost: boolean | undefined;
  //   let rid: string;
  //   do{
  //     rid = uuidv4();
  //     idUsedPost =  this.ListPosts?.some(post => post.id == rid);
  //   }while(idUsedPost)
  //   return rid;
  // }




}
