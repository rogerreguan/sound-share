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
    id: string;
    title: string;
    artist?: IArtist;
    releasedate: string;
    tracklist: number;
    image?: string;
}
export interface IArtist {
    id: string;
    name: string;
    followers?: number | null;
    image: string | null;
}

export interface IProfile {
    id: string;
    username?: string;
    image?: string;
}
