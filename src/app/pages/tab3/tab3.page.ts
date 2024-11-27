import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonText, IonButton } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { ProfileService } from 'src/app/services/profile.service';
import { IPost, IProfile } from 'src/model/interfaces';
import { PostsService } from 'src/app/services/posts.service';
import { SectionAlbumComponent } from "../../shared/components/section-album/section-album.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonButton, IonText, IonHeader, IonToolbar, IonTitle, IonContent, SectionAlbumComponent, CommonModule],
})
export class Tab3Page {

  email!: string;
  username!: string;
  uprofile!: IProfile;
  ListPosts!: IPost[];

  constructor(private router: Router, private authService: AuthService, private profileService: ProfileService, private postsService: PostsService) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const email = user.email;
        email != null ? this.email = email : this.email = 'notfound';
        this.getProfile();
      } else {
        console.log('No authenticated user');
      }
    });
    this.getPosts();

  }

  signOut() {
    this.authService.logout().then(() => {
      this.router.navigateByUrl('login');
    })
    this.authService.logout();
  }

  getProfile() {
    this.profileService.getUserProfile()?.subscribe((uprofile) => {
      if (uprofile?.username) {
        this.username = uprofile.username;
        this.getPosts();
      } else {
        console.log("no user logged");
      }
    });
  }

  getPosts() {
    if (this.username) {
      this.postsService.getPostsByUser(this.username).subscribe((posts: IPost[]) => {
        this.ListPosts = posts;
      });
    }
  }



}
