import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentSearchContainerComponent } from './recent-search-container.component';

describe('RecentSearchContainerComponent', () => {
  let component: RecentSearchContainerComponent;
  let fixture: ComponentFixture<RecentSearchContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentSearchContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecentSearchContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
