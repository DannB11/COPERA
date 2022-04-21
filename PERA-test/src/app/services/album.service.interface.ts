import { Observable } from "rxjs";
import Album from "../Album";

export interface IAlbumService{
    getAlbums(): Observable<string>;

    saveAlbums(albums:string): string;
}