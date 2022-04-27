import { identifierName } from '@angular/compiler';
import { AbstractJsEmitterVisitor } from '@angular/compiler/src/output/abstract_js_emitter';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Song from './Song';
import { AlbumService } from './services/album.mock.service';
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
  sortBy: string = "ID";
  
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

  albums: Song[] = [];
  maxPerPage: number = 10;
  start: number = 0;
  end: number = this.maxPerPage;
  total: number = 0;
  deleteForm: FormGroup;
  delete: boolean = false;
  allSelected: boolean = false;
  checked: string[] = [];
  constructor(private albumServices: AlbumService,
    private fb: FormBuilder,
    private modalService: NgbModal) {
    this.deleteForm = this.fb.group({
      checkArray: this.fb.array([], [Validators.required]),
    });
  }
  
  ngOnInit(): void {
    this.load(true);
  }
  

  uncheckAll(){
  // Sets all check boxes and the select all checkbox to unselected
    this.checked = [];
    this.allSelected = false;
  }

  onCheckboxChange(e: any) {
  // stores the value of any checkbox changes
    this.allSelected = false;
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
  // selects all check boxes currently being displayed
    if(this.allSelected){
      this.uncheckAll();
    }
    else{
      this.allSelected = true;
      var pointer: number = this.start;
      while(pointer < this.getEndOfPage()){
        this.checked.push(this.albums[pointer].id.toString());
        pointer++;
      }
    }
  }
  
  openConfirmDelete(): void {
  // opens a modal to confirm the deletion
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
              this.deleteId(id);
            }});
          this.checked = [];
          this.allSelected = false;
          if(this.end > this.albums.length){
            this.scrollDown();
          }
        }
      });
    }  
  }

  openNewEntry(): void {
  // opens a modal for entering new entries
    this.allSelected = false;
    this.checked = [];
    var modRef = this.modalService.open(ModalNewEntryComponent);
    modRef.result.then((data)=>{
      if(data){
        var form: NgForm = data;
        this.submitNew(form);
      }
    });
  }

  load(init: boolean){
  // loads the JSON of songs from the database
    this.albumServices.getSongs().subscribe((inData: string) => {
      var jsonData: any[] = JSON.parse(inData);
      var confirm: any = jsonData[0].confirmation;
      var data: any[] = jsonData[0].data;
      // if confirmation message is set to false, database connnection failed, launch modal to alert user
      if(!confirm){
        var modRef = this.modalService.open(ModalConfirmComponent);
        modRef.componentInstance.header = "Connection Error";
        modRef.componentInstance.message = "Unable to reach server..";
        modRef.componentInstance.yesButton = "Try Again";
        modRef.result.then((data)=>{
          if(data == true){
            this.load(init);
            return;
          }
          return;
        });
      }else{
        this.albums = [];
        data.forEach(element => {
          var album: Song = new Song(element.id, element.title, element.artist, element.date, element.price)
          this.albums.push(album);
        });

        this.total = this.albums.length;
        this.start = 0;
        this.end = this.maxPerPage;
        // open modal to alert user their load was successful if this is not during the initial load of the program  
        if (!init){
          var modRef = this.modalService.open(ModalMessageComponent);
          modRef.componentInstance.header = "Load Complete";
          modRef.componentInstance.message = "Your song records have been successfuly loaded.";
        }
      }
    });
  }

  save(){
  // saves the JSON of songs from the database
    this.allSelected = false;
    this.checked = [];
    var saveConfirm = this.albumServices.saveSongs(JSON.stringify(this.albums));
    var jsonData: any[] = JSON.parse(saveConfirm);
    var conf: any = jsonData[0].confirmation;
    // if confirmation message is set to false, database connnection failed, launch modal to alert user
    if (!conf){
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

  isChecked(id: number){
  // checks if the checkbox assigned to a song id is currently active
    var y: string = id.toString();
    if(this.checked.indexOf(y) >= 0){
      return true;
    }
    return false;
  }

  getEndOfPage(){
  // returns the index of the last item displayed on the current page
    if(this.end > this.total){
      return this.total;
    }
    return this.end;
  }

  setMax(songs: number){
  // set the max number of songs that should be displayed per page
    this.maxPerPage = songs;
    this.start = 0;
    this.end = songs;
  }

  sort(by: string) {
  // sorts all songs loaded by any column
    this.uncheckAll();
    this.sortBy = by;
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
 
  deleteId(id: number) {
  // removes a song with the given id
    this.albums.forEach((album,index)=>{
      if(album.id == id) this.albums.splice(index,1);
   })
   this.total = this.albums.length;
  }

  scrollDown(){
  // goes back 1 page
    if (this.start > 0){
      this.uncheckAll();
      this.start = this.start - this.maxPerPage;
      this.end = this.end - this.maxPerPage;
      if (this.start < 0){
        this.start = 0;
      this.end = this.maxPerPage;
      }
    }
  }

  scrollUp(){
  // goes forward 1 page
    if(this.end < this.albums.length){
      this.uncheckAll();
      this.allSelected = false;
      this.checked = [];
      this.start = this.start + this.maxPerPage;
      this.end = this.end + this.maxPerPage;
    }
  }

  hasLess(){
  // checks if there are pages accessable before current page
    if (this.start > 0){
      return true;
    }
    return false;
  }

  hasMore(){
  // checks if there are pages accessable after current page
    if (this.end < this.albums.length){
      return true;
    }
    return false;
  }

  public onOptionsSelected(event: any) {
  // listens for a change in the sort by select menu
    const value: string = event.target.value;
    this.sort(value);
    this.start = 0;
    this.end = this.maxPerPage;
 }

 public onSizeSelected(event: any) {
  // listens for a change in the page size select menu
    const value: string = event.target.value;
    this.checked = [];
    this.allSelected = false;
    if(value == "All"){
      this.setMax(this.albums.length);
    }
    else if(value == "10"){
      this.setMax(10);
    }
    else if(value == "20"){
      this.setMax(20);
    }
    else if(value == "50"){
      this.setMax(50);
    }
  }

  submitNew(form: NgForm) {
  // attempts to insert a new song into the local dataset
    var found: boolean = false;
    // launch modal if entry ID already exsists
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
        this.allSelected = false;
        this.albums.push(new Song(Math.abs(form.value.id), form.value.title, form.value.artist, new Date(form.value.date), Math.abs(form.value.price)));
        this.total = this.albums.length
        form.resetForm();
      }
    }  
  }
}
