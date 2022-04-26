import { CssSelector } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { By } from '@angular/platform-browser';
import { ModalMessageComponent } from './modal.component';

describe('ModalMessageComponent', () => {
  let component: ModalMessageComponent;
  let fixture: ComponentFixture<ModalMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMessageComponent],
      providers: [
        NgbActiveModal 
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call done() when done button pressed.', () => {
    var doneButton = fixture.debugElement.query(By.css('.done')).nativeElement;
    spyOn(component, 'done');
    doneButton.click();
    expect(component.done).toHaveBeenCalledTimes(1);
  });
});
