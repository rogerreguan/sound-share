import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IPost } from 'src/model/interfaces';

@Component({
  selector: 'app-section-album',
  templateUrl: './section-album.component.html',
  styleUrls: ['./section-album.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class SectionAlbumComponent  implements OnInit {

  @Input() iPost!:IPost;

  ngOnInit() {}

}
