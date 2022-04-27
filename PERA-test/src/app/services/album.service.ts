import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import Song from '../Song';
import { IAlbumService } from './album.service.interface';

@Injectable({
    providedIn: 'root'
})
export class AlbumService implements IAlbumService{
    // real database not yet implimented
    albums: Song[] = [];

    constructor(private httpClient: HttpClient) {}

    getSongs() {
        return this.httpClient.get('api/album') as Observable<string>;

    }

    saveSongs(albums: string){
        var ret: any[] =[
            {
              confirmation: false
            }
          ]
          return JSON.stringify(ret);
        }

}