import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IPost } from 'src/model/interfaces';
import { IonButton } from "@ionic/angular/standalone";
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-section-album',
  templateUrl: './section-album.component.html',
  styleUrls: ['./section-album.component.scss'],
  standalone: true,
  imports: [IonButton, CommonModule]
})
export class SectionAlbumComponent  implements OnInit {

  @Input() iPost!:IPost;

  username!: string;

  ngOnInit() {}
  constructor(private profileService: ProfileService){
    this.getProfile();
  }
  getProfile(){
    this.profileService.getUserProfile()?.subscribe((uprofile)=>{
      if(uprofile?.username){
        this.username = uprofile.username;
      }else{
         console.log("no user logged");
      }
    });
  }

}
