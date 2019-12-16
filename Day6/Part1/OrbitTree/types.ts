export interface Planet {
  id?: string;
  parent?: string;
  children: string[];
}

export interface Tree {
  [key: string]: Planet;
}
