import { Component } from '@angular/core';
import { SearchToolComponent } from '../search-tool/search-tool.component';
import { ResultsContainerService } from './results-container.service';

@Component({
  selector: 'app-results-container',
  standalone: true,
  imports: [SearchToolComponent],
  templateUrl: './results-container.component.html',
  styleUrl: './results-container.component.css',
})
export class ResultsContainerComponent {
  constructor(private resultsContainerService: ResultsContainerService) {}
  public searchForCity(city: string): string {
    return city;
  }
}
