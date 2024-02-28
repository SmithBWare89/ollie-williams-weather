import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../../service/app.service';

@Component({
  selector: 'app-recent-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recent-search.component.html',
  styleUrl: './recent-search.component.css',
})
export class RecentSearchComponent {
  @Input() searchedCities: string[] | null = null;
}
