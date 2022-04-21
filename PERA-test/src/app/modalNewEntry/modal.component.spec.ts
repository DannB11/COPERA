import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalNewEntryComponent } from './modal.component';

describe('ModalNewEntryComponent', () => {
  let component: ModalNewEntryComponent;
  let fixture: ComponentFixture<ModalNewEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalNewEntryComponent],
      providers: [
        NgbActiveModal 
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNewEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
});
