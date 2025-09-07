export interface Book {
  id: number;
  title: string;
  authors: {
    name: string;
    birth_year: number;
    death_year: number;
  }[];
  summaries: string[];
  subjects: string[];
  bookshelves: string[];
  languages: string[];
  copyright: boolean;
  media_type: string;
  formats: {
    [key: string]: string;
  };
  download_count: number;
}

export interface Character {
  name: string;
  description: string;
  avatar?: string | null;
  interactions: {
    name: string;
    count: number;
  }[];
}
