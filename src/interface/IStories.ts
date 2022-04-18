export interface IStories {
  data: {
    results: IResultItem[];
  };
  loading: boolean;
  error: any;
}
export interface IResultItem {
  section: string;
  subsection: string;
  title: string;
  abstract: string;
  url: string;
  uri: string;
  byline: string;
  item_type: string;
  updated_date: string;
  created_date: string;
  published_date: string;
  material_type_facet: string;
  kicker: string;
  des_facet: string[];
  org_facet: string[];
  per_facet: string[];
  geo_facet: string[];
  multimedia: IMultimedia[];
  short_url: string;
}
export interface IMultimedia {
  url: string;
  format: string;
  height: number;
  width: number;
  type: string;
  subtype: string;
  caption: string;
  copyright: string;
}
export interface IListParams {
  section: string;
}
export type Sections =
  | 'arts'
  | 'automobiles'
  | 'books'
  | 'business'
  | 'fashion'
  | 'food'
  | 'health'
  | 'home'
  | 'insider'
  | 'magazine'
  | 'movies'
  | 'nyregion'
  | 'obituaries'
  | 'opinion'
  | 'politics'
  | 'realestate'
  | 'science'
  | 'sports'
  | 'sundayreview'
  | 'technology'
  | 'theater'
  | 't - magazine'
  | 'travel'
  | 'upshot'
  | 'us'
  | 'world';
