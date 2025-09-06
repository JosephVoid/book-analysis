import { Book } from "@/src/types";

export interface IBookCard extends Partial<Book> {
  selected: boolean;
  onClick?: () => void;
}

export interface ForceGraphNode {
  id: string;
  img?: string;
}

export interface ForceGraphLink {
  source: string;
  target: string;
  value?: number;
}

export interface ForceGraphData {
  nodes: ForceGraphNode[];
  links: ForceGraphLink[];
}
