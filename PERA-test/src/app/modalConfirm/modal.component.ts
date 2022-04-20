import { Component, OnInit, Inject, Injectable, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData } from '../DialogData';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class ModalConfirmComponent {
      
    @Input() header: string = "";
    @Input() message: string = "";
    @Input() yesButton: string = "Okay";
    @Input() noButton: string = "Cancel";
    closeResult = '';
    
  
    constructor(public modalService: NgbModal, public activeModal: NgbActiveModal) {
    }
  
    open(content: any) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          return this.closeResult = `Closed with: ${result}`;
      }, (reason) => {return this.closeResult = `Dismissed ${this.getDismissReason(reason)}`}
      );
    }
    
    done(input: boolean){
      this.activeModal.close(input);
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