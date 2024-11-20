import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square } from 'ionicons/icons';
import { PushService } from 'src/app/services/push.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);

  constructor(private pushService: PushService, private spotifyService: SpotifyService) {
    addIcons({ triangle, ellipse, square });
    pushService.registerNotifications();
    pushService.addListeners();
    spotifyService.getAlbum();
  }
}
