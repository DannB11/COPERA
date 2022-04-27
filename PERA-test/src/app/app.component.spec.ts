import { Overlay } from '@angular/cdk/overlay';
import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { applyStyles } from '@popperjs/core';
import Song from './Album';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        FormBuilder, Overlay 
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'PERA-test'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('PERA-test');
  });

  it('uncheckAll', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.checked.push("3");
    app.allSelected = true;
    app.uncheckAll();
    expect(app.checked.length).toEqual(0);
    expect(app.allSelected).toEqual(false);
  });

  it('selectAllOnPage', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    var alb: Song = new Song(1,'a','a',new Date(1000,1,1), 4);
    app.albums = []
    app.albums.push(alb);
    app.total = 1;
    app.allSelected = false;
    app.selectAllOnPage();
    expect(app.allSelected).toEqual(true);
    expect(app.checked.length).toEqual(1);
  });

  it('selectAllOnPage calls uncheckAll once when all_selected true.', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    app.allSelected = true;
    spyOn(app, 'uncheckAll');
    app.selectAllOnPage();
    expect(app.uncheckAll).toHaveBeenCalledTimes(1);
  });

  it('selectAllOnPage calls uncheckAll 0 when all_selected false.', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    app.allSelected = false;
    spyOn(app, 'uncheckAll');
    app.selectAllOnPage();
    expect(app.uncheckAll).toHaveBeenCalledTimes(0);
  });

  it('isChecked can find a value', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.checked.push('3');
    var found: boolean = app.isChecked(3);
    expect(found).toEqual(true);
  });

  it('isChecked can tell value not present', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.checked.push('3');
    var found: boolean = app.isChecked(4);
    expect(found).toEqual(false);
  });

  it('setMax test', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.maxPerPage = 10;
    app.start = 10;
    app.end = 10;
    app.setMax(100);
    expect(app.maxPerPage).toEqual(100);
    expect(app.start).toEqual(0);
    expect(app.end).toEqual(100);
  });

  
  it('get_true_end end bigger than total', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.end = 100;
    app.total = 0;
    expect(app.getEndOfPage()).toEqual(0);
  });

  
  it('get_true_end end same than total', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.end = 100;
    app.total = 100;
    expect(app.getEndOfPage()).toEqual(100);
  });

  it('get_true_end end less than total', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.end = 0;
    app.total = 100;
    expect(app.getEndOfPage()).toEqual(0);
  });

  it('sorts by ID', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    var alb1 = new Song(1,'a','a',new Date(1000,1,1), 1);
    var alb2 = new Song(2,'b','b',new Date(1001,2,2), 2);
    app.albums = [alb2, alb1];
    app.sort("ID");
    var front = app.albums[0]
    expect(front?.id).toEqual(1);
    
  });

  it('sorts by Title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    var alb1 = new Song(2,'a','a',new Date(1000,1,1), 1);
    var alb2 = new Song(1,'b','b',new Date(1001,2,2), 2);
    app.albums = [alb2, alb1];
    app.sort("Title");
    var front = app.albums[0]
    expect(front?.title).toEqual('a');
    
  });

  it('sorts by Artist', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    var alb1 = new Song(2,'a','a',new Date(1000,1,1), 1);
    var alb2 = new Song(1,'b','b',new Date(1001,2,2), 2);
    app.albums = [alb2, alb1];
    app.sort("Artist");
    var front = app.albums[0]
    expect(front?.artist).toEqual('a');
    
  });

  it('sorts by Date(New to Old)', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    var alb1 = new Song(2,'a','a',new Date(1000,1,1), 1);
    var alb2 = new Song(1,'b','b',new Date(1001,2,2), 2);
    app.albums = [alb2, alb1];
    app.sort("Date(New to Old)");
    var front = app.albums[0]
    expect(front?.id).toEqual(1);
  });

  it('sorts by Date(Old to New)', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    var alb1 = new Song(2,'a','a',new Date(1000,1,1), 1);
    var alb2 = new Song(1,'b','b',new Date(1001,2,2), 2);
    app.albums = [alb2, alb1];
    app.sort("Date(Old to New)");
    var front = app.albums[0]
    expect(front?.id).toEqual(2);
  });

  it('sorts by Price(Low to High)', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    var alb1 = new Song(2,'a','a',new Date(1000,1,1), 1);
    var alb2 = new Song(1,'b','b',new Date(1001,2,2), 2);
    app.albums = [alb2, alb1];
    app.sort("Price(Low to High)");
    var front = app.albums[0]
    expect(front?.id).toEqual(2);
  });

  it('sorts by Price(High to Low)', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    var alb1 = new Song(2,'a','a',new Date(1000,1,1), 1);
    var alb2 = new Song(1,'b','b',new Date(1001,2,2), 2);
    app.albums = [alb2, alb1];
    app.sort("Price(High to Low)");
    var front = app.albums[0]
    expect(front?.id).toEqual(1);
  });

  it('deletes the correct entry', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    var alb1 = new Song(2,'a','a',new Date(1000,1,1), 1);
    var alb2 = new Song(1,'b','b',new Date(1001,2,2), 2);
    app.albums = [alb2, alb1];
    app.deleteId(1);
    expect(app.albums.length).toEqual(1);
  });

  it('doesnt delete if it doesnt find a match ', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    var alb1 = new Song(2,'a','a',new Date(1000,1,1), 1);
    var alb2 = new Song(1,'b','b',new Date(1001,2,2), 2);
    app.albums = [alb2, alb1];
    app.deleteId(3);
    expect(app.albums.length).toEqual(2);
  });

  it('checks if it has more pages (true)', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.albums = [];
    var alb1 = new Song(2,'a','a',new Date(1000,1,1), 1);
    app.albums = [alb1];
    app.end = 0;
    expect(app.hasMore()).toEqual(true);
  });

  it('checks if it has more pages (false)', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.albums = [];
    var alb1 = new Song(2,'a','a',new Date(1000,1,1), 1);
    app.albums = [alb1];
    app.end = 10;
    expect(app.hasMore()).toEqual(false);
  });

  it('checks if it has less pages (true)', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.start = 10;
    expect(app.hasLess()).toEqual(true);
  });

  it('checks if it has less pages (false)', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.start = 0;
    expect(app.hasLess()).toEqual(false);
  });

  it('can scroll up when available', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.albums = [];
    var alb1 = new Song(2,'a','a',new Date(1000,1,1), 1);
    app.albums = [alb1];
    app.start = 0;
    app.end = 0;
    app.maxPerPage = 100;
    spyOn(app, 'uncheckAll');
    app.scrollUp();
    expect(app.uncheckAll).toHaveBeenCalledTimes(1);
    expect(app.start).toEqual(100);
    expect(app.end).toEqual(100);
  });

  it('wont scroll up when unavaiable', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.albums = [];
    app.start = 0;
    app.end = 10;
    app.maxPerPage = 100;
    spyOn(app, 'uncheckAll');
    app.scrollUp();
    expect(app.uncheckAll).toHaveBeenCalledTimes(0);
    expect(app.start).toEqual(0);
    expect(app.end).toEqual(10);
  });

  it('can scroll down when available', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.start = 10;
    app.end = 10;
    app.maxPerPage = 10;
    spyOn(app, 'uncheckAll');
    app.scrollDown();
    expect(app.uncheckAll).toHaveBeenCalledTimes(1);
    expect(app.start).toEqual(0);
    expect(app.end).toEqual(0);
  });

  it('wont scroll down when unavaiable', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.albums = [];
    app.start = 0;
    app.end = 10;
    app.maxPerPage = 10;
    spyOn(app, 'uncheckAll');
    app.scrollDown();
    expect(app.uncheckAll).toHaveBeenCalledTimes(0);
    expect(app.start).toEqual(0);
    expect(app.end).toEqual(10);
  });
});
