export interface IAlbum {
    id: string;
    title: string;
    artist: string;
    year: number;
    tracklist: string;
    rank: number;
    opinion: string;
    actiu: boolean;
    user?: string;
}