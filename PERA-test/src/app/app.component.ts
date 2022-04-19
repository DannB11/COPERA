import { identifierName } from '@angular/compiler';
import { AbstractJsEmitterVisitor } from '@angular/compiler/src/output/abstract_js_emitter';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import Album from './Album';
import { Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData } from './DialogData';
import { ModalComponent } from './modal/modal.component';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  closeDelete: string = "";
  title = 'PERA-test';
  sort_by: string = "ID"
  new_hidden: boolean = true;
  sortOptions: string[] = [ 
    "ID",
    "Title",
    "Artist",
    "Date",
    "Price"
  ]
  sizeOptions: string[] = [
    "10",
    "20",
    "50",
    "All"
  ]
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
      title: 'Waterfalls',
      artist: 'TLC',
      date: new Date(1994, 31 , 10),
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
  max_per_page: number = 10;
  start: number = 0;
  end: number = this.max_per_page;
  total: number = this.albums.length;
  delete_form: FormGroup;
  delete: boolean = false;
  all_selected: boolean = false;
  constructor(
    private fb: FormBuilder, 
    public dialog: MatDialog,
    private modalService: NgbModal) {
    this.delete_form = this.fb.group({
      checkArray: this.fb.array([], [Validators.required]),
    });
  }
  checked: string[] = [];

  onCheckboxChange(e: any) {
    this.all_selected = false;
    if (e.target.checked) {
      this.checked.push(e.target.value);
    } else {
      const index = this.checked.indexOf(e.target.value.toString(), 0);
      if (index > -1) {
        this.checked.splice(index, 1);
      }
      return;
    }
  }

  select_all() {
    if(this.all_selected){
      this.all_selected = false;
      this.checked = [];
    }
    else{
      this.all_selected = true;
      var pointer: number = this.start;
      while(pointer < this.get_true_end()){
        this.checked.push(this.albums[pointer].id.toString());
        pointer++;
      }
    }
  }
  
  openConfirmDelete(): void {
    if(this.checked.length > 0){
      const dialogRef = this.dialog.open(ModalComponent);

      dialogRef.afterClosed().subscribe(result => {
        if(result == true){
          this.checked.forEach((item: string) => {
            if(item != null){
              var id: number = +item;
              this.delete_id(id);
            }
          });
          this.delete_form.reset();
          this.all_selected = false;
        }
      });
    }
  }

  is_checked(x: number){
    var y: string = x.toString();
    if(this.checked.indexOf(y) >= 0){
      return true;
    }
    return false;
  }

  get_true_end(){
    if(this.end > this.total){
      return this.total;
    }
    return this.end;
  }

  set_max(x: number){
    this.max_per_page = x;
    this.start = 0;
    this.end = x;
  }

  show_new_form(){
    this.new_hidden = false;
  }

  hide_new_form(){
    this.new_hidden = true;
  }


  sort(by: string) {
    this.delete_form.reset();
    this.all_selected = false;
    this.checked = [];
    this.sort_by = by;
    this.albums.sort((a, b) => a.id - b.id);
    switch(by){
      case "ID":{
        break;
      }
      case "Title":{
        this.albums.sort((a, b) => a.title.localeCompare(b.title)) 
        break;
      }
      case "Artist":{
        this.albums.sort((a, b) => a.artist.localeCompare(b.artist))
        break;
      }
      case "Date":{
        this.albums.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        break;
      }
      case "Price":{
        this.albums.sort((a, b) => a.price - b.price)
        break;
      }
      default:{
        break;
      }
    }
  }
  
  delete_id(id: number) {
    this.albums.forEach((album,index)=>{
      if(album.id == id) this.albums.splice(index,1);
   })
   this.total = this.albums.length;
  }

  scroll_down(){
    if (this.start > 0){
      this.delete_form.reset();
      this.all_selected = false;
      this.checked = [];
      this.start = this.start - this.max_per_page;
      this.end = this.end - this.max_per_page;
      if (this.start < 0){
        this.start = 0;
      this.end = this.max_per_page;
      }
    }
  }

  scroll_up(){
    if(this.end < this.albums.length){
      this.delete_form.reset();
      this.all_selected = false;
      this.checked = [];
      this.start = this.start + this.max_per_page;
      this.end = this.end + this.max_per_page;
    }
  }

  has_less(){
    if (this.start > 0){
      return true;
    }
    return false;
  }

  has_more(){
    if (this.end < this.albums.length){
      return true;
    }
    return false;
  }

  public onOptionsSelected(event: any) {
    const value: string = event.target.value;
    this.sort(value);
    this.start = 0;
    this.end = this.max_per_page;
 }

 public onSizeSelected(event: any) {
    const value: string = event.target.value;
    this.checked = [];
    this.all_selected = false;
    if(value == "All"){
      this.set_max(this.albums.length);
    }
    else if(value == "10"){
      this.set_max(10);
    }
    else if(value == "20"){
      this.set_max(20);
    }
    else if(value == "50"){
      this.set_max(50);
    }
  }

  submit_new(form: NgForm) {
    this.delete_form.reset();
    var found: boolean = false;
    this.albums.forEach(album => {
      if(album.id == form.value.id){
        console.log(form.value.id);
        console.log(album.id);
        console.log("This ID already exists in your playlist");
        found = true;
        return;
      }
    })
    if(!found){
      //Verify all fields are filled
      if(form.value.id != "" && form.value.title != "" && form.value.artist != "" && form.value.date != "" && form.value.price != ""){
        console.log(form.value.date);
        this.albums.push(new Album(Math.abs(form.value.id), form.value.title, form.value.artist, new Date(form.value.date), Math.abs(form.value.price)));
        this.total = this.albums.length
      }
    }  
  }
}
