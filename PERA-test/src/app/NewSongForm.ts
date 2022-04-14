import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'register-form',
  templateUrl: 'app/register-form.component.html',
})
export class NewSongForm {
  registerUser(form: NgForm) {
    console.log(form.value);
    // {email: '...', password: '...'}
    // ... <-- now use JSON.stringify() to convert form values to json.
  }
}