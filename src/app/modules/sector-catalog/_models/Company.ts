import { Folder } from "./Folder";

export interface Company {
  Code: string;
  Name: string;
  Origin: string;
  Folders: Folder[];
}
