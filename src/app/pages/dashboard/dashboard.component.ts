import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {ProductsComponent} from '../products/products.component';
import {FooterComponent} from '../footer/footer.component';
import {PageRequestDTO, ProductItemList} from '@rentalproduct/models';
import {FormControl, FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {debounceTime} from 'rxjs';
import {MatSelectModule} from '@angular/material/select';
import {SidebarComponent} from 'app/components/reusable/sidebar/sidebar.component';
import {MatDialog} from '@angular/material/dialog';
import {TrendingNewsComponent} from '../trending/trending-news.component';
// import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NgMultiSelectDropDownModule,
    ProductsComponent,
    FooterComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  dropdownList: ProductItemList[] = [];
  selectedItems: ProductItemList[] = [];
  dropdownSettings: any = {};
  pageRequestDTO!: PageRequestDTO;
  selectedProductId: string = 'name';
  favoriteCarControl = new FormControl('BMW');
  dropdownCarControl = new FormControl('');
  private dialog = inject(MatDialog);
  ngOnInit() {
    this.dropdownList = [
      {item_id: 'id_name', item_text: 'Name'},
      {item_id: 'id_price', item_text: 'Price'},
    ];

    this.selectedItems = [{item_id: 'name', item_text: 'Name'}];

    this.dropdownSettings = {
      singleSelection: true, //TODO: revert to false
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };

    this.favoriteCarControl.valueChanges.pipe(debounceTime(5000)).subscribe((value) => {
      console.log('User input:', value);
    });
  }

  onItemSelect(item: any) {
    this.pageRequestDTO = {
      sortByColumn: item.item_id,
    };
  }

  public switchProduct(event: Event): void {
    const productId = (event.target as HTMLSelectElement).value;

    this.selectedProductId = productId;
  }

  onSelectAll(items: unknown) {
    console.log(items);
  }

  openTrendingNews(): void {
    console.log('opening');
    this.dialog.open(TrendingNewsComponent, {
      position: {right: '0px'},
    });
  }
}
