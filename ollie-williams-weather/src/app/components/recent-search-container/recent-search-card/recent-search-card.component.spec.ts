import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentSearchCardComponent } from './recent-search-card.component';

describe('RecentSearchCardComponent', () => {
  let component: RecentSearchCardComponent;
  let fixture: ComponentFixture<RecentSearchCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentSearchCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecentSearchCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
