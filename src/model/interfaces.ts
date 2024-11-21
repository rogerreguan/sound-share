export interface IPost {
    id?: string;
    stars: number;
    opinion: string;
    user?: string;
    dateTime?: Date;
    date?: number;
    album?: IAlbum;
}
export interface IAlbum {
    id?: string;
    title: string;
    artist?: IArtist;
    year: number;
    tracklist: number;
}

export interface IArtist {
    name: string;
    followers: number;
    image: string;
}
