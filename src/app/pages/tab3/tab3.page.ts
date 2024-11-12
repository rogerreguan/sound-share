import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent],
})
export class Tab3Page {

  email!: string;

  constructor(private router: Router, private authService: AuthService) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const email = user.email;
        email!=null ? this.email = email : this.email = 'notfound';
        console.log('Correo electrónico del usuario:', email);
        // Aquí puedes usar el email como desees
      } else {
        console.log('No hay un usuario autenticado');
      }
    });

  }

  signOut(){
    this.authService.logout().then(() =>{
      this.router.navigateByUrl('login');
    })
    this.authService.logout();
  }
  
}
