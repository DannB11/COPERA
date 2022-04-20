import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData } from '../DialogData';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class ModalComponent {
    closeResult = '';
  
    constructor(public modalService: NgbModal) {
    }
  
    open(content: any) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          return this.closeResult = `Closed with: ${result}`;
      }, (reason) => {return this.closeResult = `Dismissed ${this.getDismissReason(reason)}`}
      );
      this.modalService.activeInstances.subscribe();
    }
    


    done(input: boolean){
      this.modalService.dismissAll();
      this.closeResult = input.toString();
      return input;
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