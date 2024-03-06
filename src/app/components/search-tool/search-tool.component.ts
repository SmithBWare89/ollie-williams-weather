import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faMagnifyingGlass,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-search-tool',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './search-tool.component.html',
  styleUrl: './search-tool.component.css',
})
export class SearchToolComponent {
  @Input() set searchError(bool: boolean) {
    this._error$.next(bool);
  }

  public magnifyingGlass: IconDefinition = faMagnifyingGlass;
  private regEx: RegExp = /^[A-Za-z ]*$/g;
  public citySearchForm = new FormGroup({
    searchCity: new FormControl('', {
      validators: [Validators.required],
    }),
  });
  private _error$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false,
  );
  public error$: Observable<boolean> = this._error$.asObservable();

  @Output() searchedCityEvent: EventEmitter<string> =
    new EventEmitter<string>();
  public onSubmit(): void {
    this._error$.next(false);
    const searchedCity: string | null | undefined =
      this.citySearchForm.get('searchCity')?.value;
    const validatedFormInput: string =
      this.validateSearchedCityForm(searchedCity);
    if (!validatedFormInput.length) {
      this._error$.next(true);
      return;
    }
    this.searchedCityEvent.emit(validatedFormInput);
    this.citySearchForm.controls['searchCity'].setValue('');
  }

  private validateSearchedCityForm(
    searchedCity: string | null | undefined,
  ): string {
    if (!searchedCity) return '';
    return !this.citySearchForm.hasError('required') &&
      searchedCity.match(this.regEx)
      ? searchedCity.trim()
      : '';
  }
}
