import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchToolComponent } from './search-tool.component';

describe('SearchToolComponent', () => {
  let component: SearchToolComponent;
  let fixture: ComponentFixture<SearchToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchToolComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
