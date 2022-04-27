import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import Song from '../Album';
import { IAlbumService } from './album.service.interface';

@Injectable({
    providedIn: 'root'
})
export class AlbumService implements IAlbumService{

    albums: Song[] = [
        {
          id: 0,
          title: 'Waterfalls',
          artist: 'TLC',
          date: new Date(1995, 7, 15),
          price: 1
        },
        {
          id: 1,
          title: 'Creep',
          artist: 'TLC',
          date:  new Date(1994, 9, 25),
          price: 1
        },
        {
          id: 2,
          title: 'Kiss from a Rose',
          artist: 'Seal',
          date: new Date(1994, 9, 25),
          price: 2
        },
        {
          id: 3,
          title: 'Always',
          artist: 'Bon Jovi',
          date: new Date(1994, 9, 25),
          price: 3
        },
        {
          id: 4,
          title: 'Run-Around',
          artist: 'Blues Traveler',
          date: new Date(1994, 9, 25),
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
          date: new Date(1994, 9, 25),
          price: 3
        },
        {
          id: 7,
          title: 'Theme from A Summer Place',
          artist: 'Percy Faith',
          date: new Date(1959, 8, 11),
          price: 2
        },
        {
          id: 8,
          title: 'Cathys Clown',
          artist: 'The Everly Brothers',
          date: new Date(1960, 2, 18),
          price: 3
        },
        {
          id: 9,
          title: 'The Twist',
          artist: 'Hank Ballard and the Midnighters',
          date: new Date(1960, 8, 19),
          price: 1
        },
        {
          id: 10,
          title: 'We Belong Together',
          artist: 'Mariah Carey',
          date: new Date(2005, 2, 14),
          price: 3.77
        },
        {
          id: 11,
          title: 'Let Me Love You',
          artist: 'Mario',
          date: new Date(2004, 3, 10),
          price: 1
        },
        {
          id: 12,
          title: 'Since U Been Gone',
          artist: 'Kelly Clarkson',
          date: new Date(1994, 10, 16),
          price: 10
        },
        {
          id: 13,
          title: 'How We Do',
          artist: 'The Game featuring 50 Cent',
          date: new Date(2004, 10, 23),
          price: 300
        },
        {
          id: 14,
          title: 'Beverly Hills',
          artist: 'Weezer',
          date: new Date(2005, 2, 28),
          price: 3
        },
        {
          id: 15,
          title: 'Holiday',
          artist: 'Green Day',
          date: new Date(2005,  2, 12),
          price: 2
        },
        {
          id: 16,
          title: 'Sugar, Were Goin Down',
          artist: 'Fall Out Boy',
          date: new Date(2005, 3, 4),
          price: 1
        },
        {
          id: 17,
          title: 'Rolling in the Deep',
          artist: 'Adele',
          date: new Date(2010,  10, 29),
          price: 2
        },
        {
          id: 18,
          title: 'Rolling in the Deep',
          artist: 'Adele',
          date: new Date(2010, 10, 29),
          price: 5
        },
        {
          id: 19,
          title: 'Someone Like You"',
          artist: 'Adele',
          date: new Date(2010, 10, 29),
          price: 1
        },
        {
          id: 20,
          title: 'Eine kleine Nachtmusik',
          artist: 'Mozart',
          date: new Date(1787, 5, 1),
          price: 1
        }
    
      ] 
    getSongs() {
    // Returns all songs in the database
      // 4/5 chance to "receive data from the server"
        if (Math.random() * 5 > 1){
            var ret: any[] =[
              {
                confirmation: true,
                data: this.albums.slice(0, this.albums.length)
              }
            ]
            return of(JSON.stringify(ret));
        }
      /** 1/5 chance to "not receive data from the server" */
        var ret: any[] =[
          {
            confirmation: false,
            data: this.albums.slice(0, 0)
          }
        ]
        return of(JSON.stringify(ret));
        
    }

    saveSongs(albums: string){
    // saves songs to the "database"
        this.albums = [];
        // 4/5 chance to "send data from the server"
        if (Math.random() * 5 > 1){
            var tempAlbums: any[] = JSON.parse(albums);
            tempAlbums.forEach(element => {
              var album: Song = new Song(element.id, element.title, element.artist, element.date, element.price)
              this.albums.push(album);
            });
            var ret: any[] =[
              {
                confirmation: true
              }
            ]
            return JSON.stringify(ret);
        }
        /** 1/5 chance to "not send data from the server" */
        var ret: any[] =[
          {
            confirmation: false
          }
        ]
        return JSON.stringify(ret);
    }

}