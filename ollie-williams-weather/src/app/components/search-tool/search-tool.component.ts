import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faMagnifyingGlass,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-tool',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './search-tool.component.html',
  styleUrl: './search-tool.component.css',
})
export class SearchToolComponent {
  public magnifyingGlass: IconDefinition = faMagnifyingGlass;
}
