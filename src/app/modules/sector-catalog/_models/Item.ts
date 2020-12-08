
export interface Item {
  Category: string;
  Name: string;
  SubCategory: string;
  Language: string;
  Width?: (null | number)[];
  Height?: (null | number)[];
  Url: string;
  Description: string;
  Guid: string;
  DisplayMode?: string;
}
