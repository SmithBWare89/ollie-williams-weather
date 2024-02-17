import { Component } from '@angular/core';
import { SearchToolComponent } from '../search-tool/search-tool.component';
import { ResultsContainerService } from './results-container.service';
import { RecentSearchComponent } from '../recent-search/recent-search.component';

@Component({
  selector: 'app-results-container',
  standalone: true,
  imports: [SearchToolComponent, RecentSearchComponent],
  templateUrl: './results-container.component.html',
  styleUrl: './results-container.component.css',
})
export class ResultsContainerComponent {
  constructor(private resultsContainerService: ResultsContainerService) {}
  public addSearchedCity(city: string) {
    this.resultsContainerService.addSearchedCity(city);
  }
}
