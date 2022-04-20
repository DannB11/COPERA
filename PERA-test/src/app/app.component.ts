import { identifierName } from '@angular/compiler';
import { AbstractJsEmitterVisitor } from '@angular/compiler/src/output/abstract_js_emitter';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Album from './Album';
import { AlbumService } from './services/album.mock.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData } from './DialogData';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalNewEntryComponent } from './modalNewEntry/modal.component';
import { ModalConfirmComponent } from './modalConfirm/modal.component';
import { ModalMessageComponent } from './modalMessage/modal.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  closeDelete: string = "";
  title = 'PERA-test';
  sort_by: string = "ID"
  new_hidden: boolean = true;
  sortOptions: string[] = [ 
    "ID",
    "Title",
    "Artist",
    "Date(New to Old)",
    "Date(Old to New)",
    "Price(Low to High)",
    "Price(High to Low)"
  ]
  sizeOptions: string[] = [
    "10",
    "20",
    "50",
    "All"
  ]

  albums: Album[] = [];
  max_per_page: number = 10;
  start: number = 0;
  end: number = this.max_per_page;
  total: number = 0;
  delete_form: FormGroup;
  delete: boolean = false;
  all_selected: boolean = false;
  form_hide: string = "";

  constructor(private albumServices: AlbumService,
    private fb: FormBuilder, 
    public dialog: MatDialog,
    private modalService: NgbModal) {
    this.delete_form = this.fb.group({
      checkArray: this.fb.array([], [Validators.required]),
    });
  }
  ngOnInit(): void {
    this.load(true);
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

  selectAllOnPage() {
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
      var modRef = this.modalService.open(ModalConfirmComponent);
      modRef.componentInstance.header = "Confirm Delete"
      modRef.componentInstance.message = `This will delete ${this.checked.length} record(s)?`
      modRef.componentInstance.yesButton = "Delete"
      modRef.result.then((data)=>{
        if(data == true){
          this.checked.forEach((item: string) => {
            if(item != null){
              var id: number = +item;
              this.delete_id(id);
            }});
          this.checked = [];
          this.all_selected = false;
          if(this.end > this.albums.length){
            this.scroll_down();
          }
        }
      });
    }  
  }

  openNewEntry(): void {
    this.all_selected = false;
    this.checked = [];
    var modRef = this.modalService.open(ModalNewEntryComponent);
    modRef.result.then((data)=>{
      if(data){
        var form: NgForm = data;
        this.submit_new(form);
      }
    });
  }

  load(init: boolean){
    this.albumServices.getAlbums().subscribe((albums: Album[]) => {
      if (albums.length == 0){
        var modRef = this.modalService.open(ModalConfirmComponent);
        modRef.componentInstance.header = "Connection Error";
        modRef.componentInstance.message = "Unable to reach server..";
        modRef.componentInstance.yesButton = "Try Again";
        modRef.result.then((data)=>{
          if(data == true){
            this.load(init);
            return;
          }
        });
      }else{
        this.albums = albums
        this.total = this.albums.length;
        this.start = 0;
        this.end = this.max_per_page;
      }
      if (!init){
        var modRef = this.modalService.open(ModalMessageComponent);
        modRef.componentInstance.header = "Load Complete";
        modRef.componentInstance.message = "Your song records have been successfuly loaded.";
      }
    });
  }

  save(){
    var saveConfirm: boolean = this.albumServices.saveAlbums(this.albums);
    if (!saveConfirm){
      var modRef = this.modalService.open(ModalConfirmComponent);
      modRef.componentInstance.header = "Connection Error";
      modRef.componentInstance.message = "Unable to reach server..";
      modRef.componentInstance.yesButton = "Try Again";
      modRef.result.then((data)=>{
        if(data == true){
          this.save();
          return;
        }
      });
    }else{
      var modRef = this.modalService.open(ModalMessageComponent);
      modRef.componentInstance.header = "Save Complete";
      modRef.componentInstance.message = "Your song records have been successfuly stored in the database.";
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

  set_max(songs: number){
    this.max_per_page = songs;
    this.start = 0;
    this.end = songs;
  }

  sort(by: string) {
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
      case "Date(New to Old)":{
        this.albums.sort((a, b) => ( 0 - new Date(a.date).getTime()) + new Date(b.date).getTime())
        break;
      }
      case "Date(Old to New)":{
        this.albums.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        break;
      }
      case "Price(Low to High)":{
        this.albums.sort((a, b) => a.price - b.price)
        break;
      }
      case  "Price(High to Low)":{
        this.albums.sort((a, b) => (0 - a.price) + b.price)
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
    var found: boolean = false;
    this.albums.forEach(album => {
      if(album.id == form.value.id){
        var modRef = this.modalService.open(ModalConfirmComponent);
        modRef.componentInstance.header = "Entry not added";
        modRef.componentInstance.message = "This ID already exists in your playlist.";
        modRef.componentInstance.yesButton = "Try Again";
        modRef.result.then((data)=>{
          if(data == true){
            this.openNewEntry();
          }
        });
        found = true;
        return;
      } 
    })
    if(!found){
      //Verify all fields are filled
      if(form.value.id != "" && form.value.title != "" && form.value.artist != "" && form.value.date != "" && form.value.price != ""){
        this.all_selected = false;
        this.albums.push(new Album(Math.abs(form.value.id), form.value.title, form.value.artist, new Date(form.value.date), Math.abs(form.value.price)));
        this.total = this.albums.length
        form.resetForm();
      }
    }  
  }
}
