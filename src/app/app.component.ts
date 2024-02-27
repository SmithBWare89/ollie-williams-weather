import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SearchToolComponent } from './components/search-tool/search-tool.component';
import { ResultsContainerComponent } from './components/results-container/results-container.component';
import { HeroComponent } from './components/hero/hero.component';
import { ForecastComponent } from './components/forecast/forecast.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    SearchToolComponent,
    ResultsContainerComponent,
    HeroComponent,
    ForecastComponent,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
