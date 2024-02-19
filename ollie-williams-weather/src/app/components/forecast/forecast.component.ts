import { Component } from '@angular/core';
import {ForecastCardComponent} from "./forecast-card/forecast-card.component";

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [
    ForecastCardComponent
  ],
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.css'
})
export class ForecastComponent {

}
