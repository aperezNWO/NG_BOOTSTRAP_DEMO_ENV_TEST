/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Injectable, PipeTransform } from '@angular/core';
import { DecimalPipe               } from '@angular/common';
import { Country                   } from '../_models/country';
import { SortColumn, SortDirection } from './sortable.directive';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap      } from 'rxjs/operators';
import { COUNTRIES                                } from '../_models/countries';
// 1
interface SearchResult {
	countries: Country[];
	total    : number;
}
// 2.
interface State {
	page: number;
	pageSize: number;
	searchTerm: string;
	sortColumn: SortColumn;
	sortDirection: SortDirection;
}
// 3.
const compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);
// 4. 
function sort(countries: Country[], column: SortColumn, direction: string): Country[] {
	if (direction === '' || column === '') {
		return countries;
	} else {
		return [...countries].sort((a, b) => {
			const res = compare(a[column], b[column]);
			return direction === 'asc' ? res : -res;
		});
	}
}
// 5. 
function matches(country: Country, term: string, pipe: PipeTransform) {
	return (
		country.name.toLowerCase().includes(term.toLowerCase()) ||
		pipe.transform(country.area).includes(term) ||
		pipe.transform(country.population).includes(term)
	);
}
//
@Injectable({
  providedIn: 'root'
})
export class DemoService {
  // 1.
	private _loading$   = new BehaviorSubject<boolean>(true);
	private _search$    = new Subject<void>();
	private _countries$ = new BehaviorSubject<Country[]>([]);
	private _total$     = new BehaviorSubject<number>(0);
  // 2.
	private _state: State = {
		page: 1,
		pageSize: 4,
		searchTerm: '',
		sortColumn: '',
		sortDirection: '',
	};
  // 3. 	public _SEARCH_PAGES          : _BaseModel[] = [];
  // 4. 
	constructor(private pipe: DecimalPipe) {
		this._search$
			.pipe(
				tap(() => this._loading$.next(true)),
				debounceTime(200),
				switchMap(() => this._search()),
				delay(200),
				tap(() => this._loading$.next(false)),
			)
			.subscribe((result) => {
				this._countries$.next(result.countries);
				this._total$.next(result.total);
			});

		this._search$.next();
	}
  // 5. 
  private _search(): Observable<SearchResult> {
		const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

		// 1. sort
		let countries = sort(COUNTRIES, sortColumn, sortDirection);

		// 2. filter
		countries = countries.filter((country) => matches(country, searchTerm, this.pipe));
		const total = countries.length;

		// 3. paginate
		countries = countries.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
		return of({ countries, total });
	}
  //////////////////////////////////////////////////////////////////////
	// 6. PROPERTIES
	//////////////////////////////////////////////////////////////////////
	public get countries() {
		return this._countries$.asObservable();
	}
	get total() {
		return this._total$.asObservable();
	}
	get loading() {
		return this._loading$.asObservable();
	}
	get page() {
		return this._state.page;
	}
	public get pageSize() {
		return this._state.pageSize;
	}
	get searchTerm() {
		return this._state.searchTerm;
	}

	set page(page: number) {
		this._set({ page });
	}
	set pageSize(pageSize: number) {
		this._set({ pageSize });
	}
	set searchTerm(searchTerm: string) {
		this._set({ searchTerm });
	}
	set sortColumn(sortColumn: SortColumn) {
		this._set({ sortColumn });
	}
	set sortDirection(sortDirection: SortDirection) {
		this._set({ sortDirection });
	}

	private _set(patch: Partial<State>) {
		Object.assign(this._state, patch);
		this._search$.next();
	}


}
