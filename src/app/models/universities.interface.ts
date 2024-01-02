export interface IUniversities {
  name: string;
  country: string;
  alpha_two_code: string;
  domains: string[];
  web_pages: string[];
  'state-province': string | number | null;
}

export interface IFilterList {
  name: string;
  country: string;
}
