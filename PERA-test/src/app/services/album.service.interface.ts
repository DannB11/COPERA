import { Observable } from "rxjs";
import Song from "../Song";

export interface IAlbumService{
    getSongs(): Observable<string>;

    saveSongs(albums:string): string;
}