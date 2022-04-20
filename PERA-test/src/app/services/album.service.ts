import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import Album from '../Album';
import { IAlbumService } from './album.service.interface';

@Injectable({
    providedIn: 'root'
})
export class AlbumService implements IAlbumService{
    albums: Album[] = [];

    constructor(private httpClient: HttpClient) {}

    getAlbums() {
        return this.httpClient.get('api/album') as Observable<Album[]>;

    }

    saveAlbums(albums: Album[]){
        return false;
    }

}