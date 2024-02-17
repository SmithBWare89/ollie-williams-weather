import { Component } from '@angular/core';
import { SearchToolComponent } from '../search-tool/search-tool.component';
import { ResultsContainerService } from './results-container.service';
import { RecentSearchContainerComponent } from '../recent-search-container/recent-search-container.component';

@Component({
  selector: 'app-results-container',
  standalone: true,
  imports: [SearchToolComponent, RecentSearchContainerComponent],
  templateUrl: './results-container.component.html',
  styleUrl: './results-container.component.css',
})
export class ResultsContainerComponent {
  constructor(private resultsContainerService: ResultsContainerService) {}
  public searchForCity(city: string) {
    this.resultsContainerService.addSearchedCity(city);
  }
}
