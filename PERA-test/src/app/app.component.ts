import { AbstractJsEmitterVisitor } from '@angular/compiler/src/output/abstract_js_emitter';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import Album from './Album';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PERA-test';
  albums: Album[] = [
    {
      id: '0',
      title: 'Waterfalls',
      artist: 'TLC',
      date: 'August 5, 1995',
      price: '$1'
    },
    {
      id: '1',
      title: 'Creep',
      artist: 'TLC',
      date: 'October 31, 1994',
      price: '$1'
    },
    {
      id: '2',
      title: 'Kiss from a Rose',
      artist: 'Seal',
      date: 'July 18, 1994',
      price: '$2'
    },
    {
      id: '3',
      title: 'Always',
      artist: 'Bon Jovi',
      date: 'September 12, 1994',
      price: '$3'
    },
    {
      id: '4',
      title: 'Run-Around',
      artist: 'Blues Traveler',
      date: 'Febuary 28, 1995',
      price: '$1'
    },
  ]

  sort_id() {
    this.albums.sort((a, b) => a.id.localeCompare(b.id))
  }

  sort_title() {
    this.albums.sort((a, b) => a.id.localeCompare(b.id))
    this.albums.sort((a, b) => a.title.localeCompare(b.title))
  }

  sort_artist() {
    this.albums.sort((a, b) => a.id.localeCompare(b.id))
    this.albums.sort((a, b) => a.artist.localeCompare(b.artist))
  }

  sort_date() {
    this.albums.sort((a, b) => a.id.localeCompare(b.id))
    this.albums.sort((a, b) => a.date.localeCompare(b.date))
  }

  sort_price() {
    this.albums.sort((a, b) => a.id.localeCompare(b.id))
    this.albums.sort((a, b) => a.price.localeCompare(b.price))
  }
  
  delete_id(id: string) {
    this.albums.forEach((album,index)=>{
      if(album.id == id) this.albums.splice(index,1);
   })
  }

  submit_new(form: NgForm) {
    var found: boolean = false;
    this.albums.forEach(album => {
      if(album.id == form.value.id){
        console.log("This ID already exists in your playlist");
        found = true;
        return;
      }
    })
    if(!found){
      this.albums.push(new Album(form.value.id, form.value.title, form.value.artist, form.value.date, form.value.price));
    }
  }
}
