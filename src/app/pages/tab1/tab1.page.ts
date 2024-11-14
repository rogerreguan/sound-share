import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { IAlbum } from 'src/model/interfaces';
import { AlbumsService } from 'src/app/services/albums.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SectionAlbumComponent } from 'src/app/shared/components/section-album/section-album.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, ReactiveFormsModule, SectionAlbumComponent, CommonModule],
})
export class Tab1Page {
  ListAlbums!: IAlbum[];

  constructor(private albumsService: AlbumsService) {
    this.getAlbums();
  }
  
  getAlbums() {
    this.albumsService.getAlbums().subscribe((albums: IAlbum[]) => {
      this.ListAlbums = albums;
    });
  }

}
