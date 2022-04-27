import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalNewEntryComponent } from './modal.component';

describe('ModalNewEntryComponent', () => {
  let component: ModalNewEntryComponent;
  let fixture: ComponentFixture<ModalNewEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalNewEntryComponent, NgForm],
      providers: [
        NgbActiveModal, FormBuilder, FormsModule
      ]
      
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNewEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call Cancel() when cancel button pressed.', () => {
    var doneButton = fixture.debugElement.query(By.css('.cancel')).nativeElement;
    spyOn(component, 'cancel');
    doneButton.click();
    expect(component.cancel).toHaveBeenCalledTimes(1);
  });
});
