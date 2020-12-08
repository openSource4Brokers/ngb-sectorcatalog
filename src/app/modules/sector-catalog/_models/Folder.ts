import { FolderDescription } from "./FolderDescription";
import { Item } from "./Item";


export interface Folder {
  FolderGuid: string;
  Type: string;
  Name: string;
  Domain: string;
  Targets: string[];
  FolderDescription: FolderDescription;
  Items: Item[];
}
