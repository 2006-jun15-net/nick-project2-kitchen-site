import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

// two pieces of software work together to support angular testing
// 1. karma - test runner application.
//       handle launching browsers, executing the tests in those browsers,
//       and gathering the results into reports, code coverage, etc.
// 2. jasmine - test library
//       define & implement all the functions, objects, etc. in this file
//       describe, beforeEach, it, expect

// neither of these are specific to angular, they are common testing tools
// in the JS ecosystem. there are others, like Jest, Mocha. those can be
// plugged into Angular too, Jasmine/Karma are just the default.

// this file's structure is not specific to Jasmine, it's a very common
//   way to write tests in JS.


// describe(subjectUnderTest, functionWithAllTheSpecs)
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  // it(predicate, functionThatIsTheTest)

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    // in JS we expect instead of assert
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ng-new'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ng-new');
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
