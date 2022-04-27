import { Component, OnInit, Inject, Injectable, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { NONE_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class ModalNewEntryComponent {
    @Input() header: string = "New Entry";
    @Input() values: number = 0;
    errorHidden: boolean = true;
    markers: string[] = ['','','','','']
    closeResult = '';
    @Input() id: string = "";
    @Input() name: string = "";
    @Input() artist: string = "";
    @Input() releaseDate: string = "";
    @Input() price: string = "";
    
  
    constructor(public modalService: NgbModal, public activeModal: NgbActiveModal) {
    }
  
    open(content: any) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          return this.closeResult = `Closed with: ${result}`;
      }, (reason) => {return this.closeResult = `Dismissed ${this.getDismissReason(reason)}`}
      );
    }
    
    submit(form: NgForm){
      this.errorHidden = true;
      this.markers = ['','','','','']
      // show error message and * markers if any field is left blank
      if(form.value.id.length == 0){
        this.errorHidden = false;
        this.markers[0] = "*";
      }if(form.value.title == ""){
        this.errorHidden = false;
        this.markers[1] = "*";
      }if(form.value.artist == ""){
        this.errorHidden = false;
        this.markers[2] = "*";
      }if(form.value.date == ""){
        this.errorHidden = false;
        this.markers[3] = "*";
      }if(form.value.price == ""){
        this.errorHidden = false;
        this.markers[4] = "*";
      }if(this.errorHidden){
        this.activeModal.close(form);
        return;
      }
    }

    cancel(){
    // close without submitting a new entry
      this.activeModal.close();
      return;
    }

    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
      }
    }
  }