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
          date: new Date(1995, 8, 15),
          price: 1
        },
        {
          id: 1,
          title: 'Creep',
          artist: 'TLC',
          date:  new Date(1994, 31, 10),
          price: 1
        },
        {
          id: 2,
          title: 'Kiss from a Rose',
          artist: 'Seal',
          date: new Date(1994, 31, 10),
          price: 2
        },
        {
          id: 3,
          title: 'Always',
          artist: 'Bon Jovi',
          date: new Date(1994, 31, 10),
          price: 3
        },
        {
          id: 4,
          title: 'Run-Around',
          artist: 'Blues Traveler',
          date: new Date(1994, 31, 10),
          price: 1
        },
        {
          id: 5,
          title: 'Green Onions',
          artist: 'Booker T. & the MGs',
          date: new Date(1962, 1, 1),
          price: 1
        },
        {
          id: 6,
          title: 'Creep',
          artist: 'TLC',
          date: new Date(1994, 31, 10),
          price: 3
        },
        {
          id: 7,
          title: 'Theme from A Summer Place',
          artist: 'Percy Faith',
          date: new Date(1959, 11, 9),
          price: 2
        },
        {
          id: 8,
          title: 'Cathys Clown',
          artist: 'The Everly Brothers',
          date: new Date(1960, 18, 3),
          price: 3
        },
        {
          id: 9,
          title: 'The Twist',
          artist: 'Hank Ballard and the Midnighters',
          date: new Date(1960, 19, 9),
          price: 1
        },
        {
          id: 10,
          title: 'We Belong Together',
          artist: 'Mariah Carey',
          date: new Date(2005, 14, 3),
          price: 3.77
        },
        {
          id: 11,
          title: 'Let Me Love You',
          artist: 'Mario',
          date: new Date(2004, 4, 10),
          price: 1
        },
        {
          id: 12,
          title: 'Since U Been Gone',
          artist: 'Kelly Clarkson',
          date: new Date(1994, 16, 11),
          price: 10
        },
        {
          id: 13,
          title: 'How We Do',
          artist: 'The Game featuring 50 Cent',
          date: new Date(2004, 23, 11),
          price: 300
        },
        {
          id: 14,
          title: 'Beverly Hills',
          artist: 'Weezer',
          date: new Date(2005, 28, 3),
          price: 3
        },
        {
          id: 15,
          title: 'Holiday',
          artist: 'Green Day',
          date: new Date(2005, 12, 3),
          price: 2
        },
        {
          id: 16,
          title: 'Sugar, Were Goin Down',
          artist: 'Fall Out Boy',
          date: new Date(2005, 4, 4),
          price: 1
        },
        {
          id: 17,
          title: 'Rolling in the Deep',
          artist: 'Adele',
          date: new Date(2010, 29, 11),
          price: 2
        },
        {
          id: 18,
          title: 'Rolling in the Deep',
          artist: 'Adele',
          date: new Date(2010, 29, 11),
          price: 5
        },
        {
          id: 19,
          title: 'Someone Like You"',
          artist: 'Adele',
          date: new Date(2010, 29, 11),
          price: 1
        },
        {
          id: 20,
          title: 'Eine kleine Nachtmusik',
          artist: 'Mozart',
          date: new Date(1787, 1, 6),
          price: 1
        }
    
      ] 

    getAlbums() {
        if (Math.random() * 5 > 1){
            var clone: Album[] = this.albums.slice(0, this.albums.length)
            return of(clone);
        }
        var clone: Album[] = this.albums.slice(0, 0)
        return of(clone);
        
    }

    saveAlbums(albums: Album[]){
        if (Math.random() * 5 > 1){
            this.albums = albums;
            return true;
        }
        return false;
    }

}