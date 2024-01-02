import { Component, OnInit } from '@angular/core';
import { IUniversities } from 'src/app/models/universities.interface';
import { UniversitiesService } from 'src/app/services';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FilterItemsPipe } from 'src/app/pipes';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  loading: boolean = true;

  dataSource: MatTableDataSource<IUniversities>;
  displayedColums: string[];
  listOfCountries: IUniversities[];

  form: FormGroup;
  filterByName = '';
  filterByCountry = '';

  constructor(
    private universitiesService: UniversitiesService,
    private _formBuilder: FormBuilder,
    public filterItemsPipe: FilterItemsPipe
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      countryName: '',
      keywords: '',
    });

    this.displayedColums = ['name', 'country', 'state', 'url'];
    this.getAllUniversities();
  }

  private getAllUniversities(): void {
    this.universitiesService.getData().subscribe({
      next: (data: IUniversities[]) => {
        this.loading = false;

        const sortedData = this.sortUniversitiesByName(data);
        this.dataSource = new MatTableDataSource(sortedData);

        this.listOfCountries = this.getUniqueCountries(data).sort(
          (a: IUniversities, b: IUniversities) =>
            a.country.toLowerCase().localeCompare(b.country.toLowerCase())
        );
      },
      error: (error: any) => {
        console.error('Error fetching data:', error);
        this.loading = false;
      },
    });
  }

  private sortUniversitiesByName(
    universities: IUniversities[]
  ): IUniversities[] {
    return universities.sort((a, b) =>
      a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    );
  }

  private getUniqueCountries(universities: IUniversities[]): IUniversities[] {
    const uniqueCountries = this.removeDuplicatesByField(
      universities,
      'country'
    );
    return this.sortUniversitiesByName(uniqueCountries);
  }

  private removeDuplicatesByField(
    arr: IUniversities[],
    field: string
  ): IUniversities[] {
    const uniqueValues = new Set();
    return arr.filter((item: any) => {
      if (!uniqueValues.has(item[field])) {
        uniqueValues.add(item[field]);
        return true;
      }
      return false;
    });
  }

  public selectionChanged(event: MatSelectChange): void {
    this.filterByCountry = event.value;
  }

  public inputChange(event: Event): void {
    this.filterByName = (event.target as HTMLInputElement).value;
  }

  public onClickReset(): void {
    this.form.reset();
    this.filterByCountry = '';
    this.filterByName = '';
  }

  public openUrl(url: string): void {
    window.open(url, '_blank');
  }
}
