import { Pipe, PipeTransform } from '@angular/core';
import { IFilterList, IUniversities } from '../models/universities.interface';

@Pipe({
  name: 'filterItems',
})
export class FilterItemsPipe implements PipeTransform {
  transform(items: IUniversities[], filter: IFilterList): IUniversities[] {
    if (!items || !filter) {
      return items;
    }

    return items.filter(
      (item) =>
        (filter.country === '' ||
          item.country.toLowerCase().includes(filter.country.toLowerCase())) &&
        (filter.name === '' ||
          item.name.toLowerCase().includes(filter.name.toLowerCase()))
    );
  }
}
