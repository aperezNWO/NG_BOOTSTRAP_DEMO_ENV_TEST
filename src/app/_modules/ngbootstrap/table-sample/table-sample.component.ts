import { Component                         } from '@angular/core';
import { AsyncPipe, DecimalPipe            } from '@angular/common';
import { QueryList, ViewChildren           } from '@angular/core';
import { Observable                        } from 'rxjs';
import { FormsModule                       } from '@angular/forms';
import { NgbHighlight, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Country } from '../../../_models/country';
import { NgbdSortableHeader, SortEvent } from '../../../_services/sortable.directive';
import { DemoService } from '../../../_services/demo.service';

@Component({
  selector: 'app-table-sample',
  templateUrl: './table-sample.component.html',
  styleUrl: './table-sample.component.css'
})
//
export class TableSampleComponent {

	public countries!: Observable<Country[]>;
	public total!:     Observable<number>;

	@ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader> | undefined;

	constructor(public service: DemoService) {
		this.countries = service.countries;
		this.total     = service.total;
	}

	onSort({ column, direction }: SortEvent) {
		// resetting other headers
		this.headers?.forEach((header) => {
			if (header.sortable !== column) {
				header.direction = '';
			}
		});

		this.service.sortColumn = column;
		this.service.sortDirection = direction;
	}
}