import { Component } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, FridgeStubComponent],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    // in JS we expect instead of assert
    expect(app).toBeTruthy();
  });

  it(`should have as title 'kitchen-site'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('kitchen-site');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    // the data binding in angular runs on a loop
    //    this code makes sure one loop runs
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('div').textContent).toContain('(root)');
  });
});

@Component({ selector: 'app-fridge', template: '' })
class FridgeStubComponent {}
