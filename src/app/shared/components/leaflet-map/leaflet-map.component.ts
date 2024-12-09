import { Component, Input, input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { ILocation } from 'src/model/interfaces';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss'],
  standalone: true,
})
export class LeafletMapComponent  implements OnInit {

  @Input() Location: ILocation | undefined;

  private map: L.Map | undefined;

  constructor() { }

  ngOnInit() {
    this.initMap();
  }

  private initMap(): void {
    console.log(this.Location);
    
    this.map = L.map('map').setView([this.Location? this.Location.x: 0, this.Location? this.Location.y: 0], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    this.addMarker([this.Location? this.Location.x: 0,this.Location? this.Location.y: 0],"Published here!")

  }

  private addMarker(coords: [number, number], popupText: string): void {
    if (this.map) {
      const marker = L.marker(coords).addTo(this.map);
      marker.bindPopup(popupText).openPopup();
    }
  }

  // Ejemplo de método para actualizar dinámicamente la vista del mapa
  public updateView(lat: number, lng: number, zoom: number): void {
    if (this.map) {
      this.map.setView([lat, lng], zoom);
    }
  }

}
