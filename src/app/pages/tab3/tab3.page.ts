import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonText, IonButton, IonAvatar } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { ProfileService } from 'src/app/services/profile.service';
import { IPost, IProfile } from 'src/model/interfaces';
import { PostsService } from 'src/app/services/posts.service';
import { SectionAlbumComponent } from "../../shared/components/section-album/section-album.component";
import { CommonModule } from '@angular/common';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonAvatar, IonButton, IonText, IonHeader, IonToolbar, IonTitle, IonContent, SectionAlbumComponent, CommonModule],
})
export class Tab3Page {

  email!: string;
  username!: string;
  image!: string;
  uprofile!: IProfile;
  ListPosts!: IPost[];

  constructor(private router: Router, private authService: AuthService, private profileService: ProfileService, private postsService: PostsService, private loadingController: LoadingController, private alertController: AlertController) {

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
        if (uprofile?.image) this.image = uprofile!.image;
        this.getPosts();
      } else {
        console.log("no user logged");
      }
    });
  }

  getPosts() {
    if (this.username) {
      this.postsService.getPostsByUser(this.username).subscribe((posts: IPost[]) => {
        console.log(posts);
        this.ListPosts = posts;
        this.sortPostsByDateTime();
      });
      
    }
  }

  sortPostsByDateTime() {
    this.ListPosts.sort((a, b) => {
      if (a.dateTime && b.dateTime) {
        const dateA = new Date(a.dateTime).getTime(); const dateB = new Date(b.dateTime).getTime(); return dateA - dateB;
      } else if (a.dateTime) {
        return -1;
      } else if (b.dateTime) {
        return 1;
      } else {
        return 0;
      }
    });
  }
  // async changeImage() {
  // 	try {
  //     const image = await Camera.getPhoto({
  //       quality: 90,
  //       allowEditing: false,
  //       resultType: CameraResultType.Base64,
  //       source: CameraSource.Photos // Camera, Photos or Prompt!
  //     });

  //     console.log("Foto obtenida:", image);

  //     if (image && image.base64String) {
  //       const result = await this.profileService.uploadImage(image);

  //       if (!result) {
  //         console.error("No se ha podido realizar la carga de la foto.");
  //       }
  //     } else {
  //       console.error("La foto no tiene un base64String válido.");
  //     }
  //   } catch (e) {
  //     console.error("Error al cambiar la imagen:", e);
  //   }
  // }
  async changeImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos // Camera, Photos or Prompt!
    });
    console.log("imagen: ", image);

    if (image) {
      console.log("entro");
      const loading = await this.loadingController.create();
      await loading.present();
      const result = await this.profileService.uploadImage(image);
      loading.dismiss();
      this.getProfile();

      if (!result) {
        const alert = await this.alertController.create({
          header: 'Upload failed',
          message: 'There was a problem uploading your avatar.',
          buttons: ['OK']
        });
        await alert.present();
      }
    }
  }

}
