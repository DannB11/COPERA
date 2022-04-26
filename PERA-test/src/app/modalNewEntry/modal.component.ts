import { Component, OnInit, Inject, Injectable, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class ModalNewEntryComponent {
    @Input() values: number = 0;
    errorHidden: boolean = true;
    markers: string[] = ['','','','','']
    closeResult = '';
    
  
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
      if(form.value.id == ""){
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