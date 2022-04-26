import { NgModule } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {
    ModalNewEntryComponent
} from './modal.component';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [],
  exports: [FormsModule, NgForm],
  bootstrap: []
})
export class ModalComponentModule {}
