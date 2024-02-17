import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentSearchTabComponent } from './recent-search-tab.component';

describe('RecentSearchTabComponent', () => {
  let component: RecentSearchTabComponent;
  let fixture: ComponentFixture<RecentSearchTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentSearchTabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecentSearchTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
