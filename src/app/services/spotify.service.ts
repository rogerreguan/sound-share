import { Injectable } from '@angular/core';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { from, map, Observable } from 'rxjs';
import { IAlbum, IArtist } from 'src/model/interfaces';
@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private sdk!: SpotifyApi;

  constructor() {
      this.sdk = SpotifyApi.withClientCredentials("abd9ed15b3cf4817a75c4db30a27356f", "7553ee34dc514855847c3bfa67e95959");
   }

  // async getAlbum(){
  //   //const sdk = SpotifyApi.withUserAuthorization("abd9ed15b3cf4817a75c4db30a27356f", "https://localhost:3000");

  //   const items = await this.sdk.search("Post Malone", ["artist"]);
  //   console.log(items.artists.items.slice(0,5).map((item) => ({
  //       name: item.name,
  //       followers: item.followers.total,
  //       popularity: item.popularity,
  //       image: item.images[1].url,
  //   })));
  // }

  getAlbum(album: string): Observable<IAlbum[]>{
    const search = this.sdk.search(album, ["album"]);

    return from(search).pipe(
      map((items) => {
        if (!items?.albums?.items) {
          return []; 
        }
        return items.albums.items.slice(0, 5).map((item) => ({
          title: item.name || "UnKnown",
          year: +item.release_date || 0,
          tracklist: +item.total_tracks || 0,
          //artist: item.artists,
          image: item.images?.[1]?.url || ""
        }));
      })
    );
  }
  
  getArtist(artist: string): Observable<IArtist[]>{
    const search = this.sdk.search(artist, ["artist"]);

    return from(search).pipe(
      map((items) => {
        if (!items?.artists?.items) {
          return []; // Devuelve un array vacío si no hay resultados
        }
  
        return items.artists.items.slice(0, 5).map((item) => ({
          name: item.name || "UnKnown",
          followers: item.followers?.total || 0,
          image: item.images?.[1]?.url || ""
        }));
      })
    );
  }
}
