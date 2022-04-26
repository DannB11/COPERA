import { Component, OnInit, Inject, Injectable, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class ModalMessageComponent {
    @Input() header: string = "";
    @Input() message: string = "";
    @Input() buttonText: string = "Ok";
    closeResult = '';
    
  
    constructor(public modalService: NgbModal, public activeModal: NgbActiveModal) {
    }
  
    open(content: any) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          return this.closeResult = `Closed with: ${result}`;
      }, (reason) => {return this.closeResult = `Dismissed ${this.getDismissReason(reason)}`}
      );
    }
    
    done(){
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