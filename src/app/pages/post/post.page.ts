import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { IPost } from 'src/model/interfaces';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PostPage implements OnInit {

  constructor(private route: ActivatedRoute, private postsService: PostsService, private profileService: ProfileService) { }
  id?: string | null;
  Post?: IPost;
  username?: string;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('ID del Post:', this.id);
    this.getProfile();
    this.getPost();
  }

  getPost() {
    if (this.id) {
      this.postsService.getPostById(this.id).subscribe((post: IPost | null)=>{
        if(post){
          console.log(post);
          this.Post = post;
        }
      });
    }
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
