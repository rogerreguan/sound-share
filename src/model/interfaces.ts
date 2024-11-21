export interface IAlbum {
    id?: string;
    title: string;
    artist: string;
    year: number;
    tracklist: string;
    stars: number;
    opinion?: string;
    actiu: boolean;
    user?: string;
    dateTime: Date;
    date: number;
    //hourMinute: string;
}

export interface IArtist {
    name: string;
    followers: number;
    image: string;
}
