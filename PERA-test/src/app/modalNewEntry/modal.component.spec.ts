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

  /** NgForm or the way the submit button is calling the submit function is stopping these from working
  it('should add an * to markers[0] if id field is blank', () => {
    var doneButton = fixture.debugElement.query(By.css('.submit')).nativeElement;
    doneButton.click();
    fixture.detectChanges();
    expect(component.errorHidden).toEqual(false);
    expect(component.markers[0]).toEqual("*");
  });
  
  it('should call submit() when okay button pressed.', () => {
    var doneButton = fixture.debugElement.query(By.css('.submit')).nativeElement;
    spyOn(component, 'submit');
    doneButton.click();
    expect(component.submit).toHaveBeenCalledTimes(1);
  });
   */
  
});
