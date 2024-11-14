import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAlbum } from 'src/model/interfaces';
import { AlbumsService } from 'src/services/albums.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  title: string = '';
  artist: string = '';
  year: number = 1900;
  tracklist: string[] = [];
  rank: number = 0;
  opinion: string = '';

  albums?: IAlbum[];
  albumForm!: FormGroup;

  constructor(private albumsService: AlbumsService) {}

  ngOnInit(): void {
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
        rank: +this.albumForm.get('rank')!.value,
        actiu: true
      }
      this.albumsService.addAlbum(a);
      this.getAlbums();
    } else {
      alert('formulari invàlid');
    }
  }

  getAlbums() {
    const v: IAlbum[] = this.albumsService.getAlbums();
    this.albums = a;
  }

}
