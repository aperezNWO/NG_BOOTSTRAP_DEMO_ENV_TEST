import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { Country                                } from '../_models/country';
// 1. 
export type SortColumn = keyof Country | '';
export type SortDirection = 'asc' | 'desc' | '';
// 2. 
const rotate: { [key: string]: SortDirection } = { asc: 'desc', desc: '', '': 'asc' };
// 3. 
export interface SortEvent {
	column: SortColumn;
	direction: SortDirection;
}
// 4. 
@Directive({
	selector: 'th[sortable]',
	standalone: true,
	host: {
		'[class.asc]': 'direction === "asc"',
		'[class.desc]': 'direction === "desc"',
		'(click)': 'rotate()',
	},
})
export class NgbdSortableHeader {
	@Input() sortable: SortColumn = '';
	@Input() direction: SortDirection = '';
	@Output() sort = new EventEmitter<SortEvent>();

	rotate() {
		this.direction = rotate[this.direction];
		this.sort.emit({ column: this.sortable, direction: this.direction });
	}
}
