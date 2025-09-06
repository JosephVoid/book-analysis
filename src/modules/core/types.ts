import { Book, Character } from "@/src/types";

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
  count: number;
}

export interface ForceGraphData {
  nodes: ForceGraphNode[];
  links: ForceGraphLink[];
}

export interface ICardDetail {
  character?: Character;
  link?: {
    source: Character;
    target: Character;
    count: number;
  };
}
