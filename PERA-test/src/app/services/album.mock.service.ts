import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import Album from '../Album';
import { IAlbumService } from './album.service.interface';

@Injectable({
    providedIn: 'root'
})
export class AlbumService implements IAlbumService{
    albums: Album[] = [
        {
          id: 0,
          title: 'Waterfalls',
          artist: 'TLC',
          date: new Date(1995, 8 ,15),
          price: 1
        },
        {
          id: 1,
          title: 'Creep',
          artist: 'TLC',
          date:  new Date(1994, 31 , 10),
          price: 1
        },
        {
          id: 2,
          title: 'Kiss from a Rose',
          artist: 'Seal',
          date: new Date(1994, 31 , 10),
          price: 2
        },
        {
          id: 3,
          title: 'Always',
          artist: 'Bon Jovi',
          date: new Date(1994, 31 , 10),
          price: 3
        },
        {
          id: 4,
          title: 'Run-Around',
          artist: 'Blues Traveler',
          date: new Date(1994, 31 , 10),
          price: 1
        },
        {
          id: 5,
          title: 'Green Onions',
          artist: 'Booker T. & the MGs',
          date: new Date(1962, 1 , 1),
          price: 1
        },
        {
          id: 6,
          title: 'Creep',
          artist: 'TLC',
          date: new Date(1994, 31 , 10),
          price: 1
        },
        {
          id: 7,
          title: 'Kiss from a Rose',
          artist: 'Seal',
          date: new Date(1994, 31 , 10),
          price: 2
        },
        {
          id: 8,
          title: 'Always',
          artist: 'Bon Jovi',
          date: new Date(1994, 31 , 10),
          price: 3
        },
        {
          id: 9,
          title: 'Run-Around',
          artist: 'Blues Traveler',
          date: new Date(1994, 31 , 10),
          price: 1
        },
        {
          id: 10,
          title: 'Waterfalls',
          artist: 'TLC',
          date: new Date(1994, 31 , 10),
          price: 1
        },
        {
          id: 11,
          title: 'Creep',
          artist: 'TLC',
          date: new Date(1994, 31 , 10),
          price: 1
        },
        {
          id: 12,
          title: 'Kiss from a Rose',
          artist: 'Seal',
          date: new Date(1994, 31 , 10),
          price: 2
        },
        {
          id: 13,
          title: 'Always',
          artist: 'Bon Jovi',
          date: new Date(1994, 31 , 10),
          price: 3
        },
        {
          id: 14,
          title: 'Run-Around',
          artist: 'Blues Traveler',
          date: new Date(1992, 31 , 10),
          price: 1
        },
        {
          id: 15,
          title: 'Waterfalls',
          artist: 'TLC',
          date: new Date(1994, 3 , 10),
          price: 1
        },
        {
          id: 16,
          title: 'Creep',
          artist: 'TLC',
          date: new Date(1994, 3 , 1),
          price: 1
        },
        {
          id: 17,
          title: 'Kiss from a Rose',
          artist: 'Seal',
          date: new Date(1998, 31 , 10),
          price: 2
        },
        {
          id: 18,
          title: 'Always',
          artist: 'Bon Jovi',
          date: new Date(1994, 20 , 3),
          price: 3
        },
        {
          id: 19,
          title: 'Run-Around',
          artist: 'Blues Traveler',
          date: new Date(1994, 5 , 10),
          price: 1
        },
        {
          id: 20,
          title: 'Run-Around',
          artist: 'Blues Traveler',
          date: new Date(1994, 11 , 10),
          price: 1
        }
    
      ] 

    getAlbums() {
        return of(this.albums);
    }

    saveAlbums(albums: Album[]){
        this.albums = albums;
        return true;
    }

}