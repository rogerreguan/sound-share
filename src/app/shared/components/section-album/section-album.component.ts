import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IPost } from 'src/model/interfaces';
import { IonButton, IonIcon } from "@ionic/angular/standalone";
import { ProfileService } from 'src/app/services/profile.service';
import { Router, RouterLink } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-section-album',
  templateUrl: './section-album.component.html',
  styleUrls: ['./section-album.component.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, CommonModule, RouterLink]
})
export class SectionAlbumComponent  implements OnInit {

  @Input() iPost!:IPost;

  username!: string;

  ngOnInit() {}
  constructor(private profileService: ProfileService, private postsService: PostsService){
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

  DeletePost(){
    try{
    this.postsService.removePost(this.iPost);
    alert("Post Deleted");
    }catch(e){
      alert("Error.");
    }
  }

  async shareContent() {
    await Share.share({
      title: 'Test',
      text: 'Test!',
      url: 'https://www.google.com',
      dialogTitle: 'Compartir en redes sociales',
    });
  }

}
