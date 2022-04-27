import { Observable } from "rxjs";
import Song from "../Album";

export interface IAlbumService{
    getSongs(): Observable<string>;

    saveSongs(albums:string): string;
}