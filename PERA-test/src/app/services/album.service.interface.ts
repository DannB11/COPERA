import { Observable } from "rxjs";
import Album from "../Album";

export interface IAlbumService{
    getAlbums(): Observable<Album[]>;

    saveAlbums(albums: Album[]): boolean;
}