import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {ProductsComponent} from '../products/products.component';
import {FooterComponent} from '../footer/footer.component';
import {PageRequestDTO, ProductItemList} from '@rentalproduct/models';
// import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgMultiSelectDropDownModule, ProductsComponent, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  dropdownList: ProductItemList[] = [];
  selectedItems: ProductItemList[] = [];
  dropdownSettings: any = {};
  pageRequestDTO!: PageRequestDTO;
  ngOnInit() {
    this.dropdownList = [
      {item_id: 'name', item_text: 'Name'},
      {item_id: 'price', item_text: 'Price'},
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
  }

  onItemSelect(item: any) {
    this.pageRequestDTO = {
      sortByColumn: item.item_id,
    };
  }

  onSelectAll(items: unknown) {
    console.log(items);
  }
}
