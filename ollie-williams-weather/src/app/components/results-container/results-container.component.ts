import { Component } from '@angular/core';
import { SearchToolComponent } from '../search-tool/search-tool.component';

@Component({
  selector: 'app-results-container',
  standalone: true,
  imports: [SearchToolComponent],
  templateUrl: './results-container.component.html',
  styleUrl: './results-container.component.css',
})
export class ResultsContainerComponent {
  public searchForCity(city: string): string {
    return city;
  }
}
