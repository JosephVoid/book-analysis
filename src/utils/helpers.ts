import {
  ForceGraphData,
  ForceGraphLink,
  ForceGraphNode,
} from "../modules/core/types";
import { Character } from "../types";

export function base64ToImage(
  base64: string,
  mime: string = "image/jpeg"
): string {
  return `data:${mime};base64,${base64}`;
}
export function loadAvatars(characters: Character[]): Character[] {
  return characters.map((character) => ({
    ...character,
    avatar: localStorage.getItem(character.name) ?? null,
  }));
}

export function parseGeminiJSON<T>(response: string): T {
  const cleaned = response.replace(/^```json\s*/, "").replace(/\s*```$/, "");

  return JSON.parse(cleaned) as T;
}

export function charactersToGraphData(characters: Character[]): ForceGraphData {
  const nodes: ForceGraphNode[] = characters.map((char) => ({
    id: char.name,
    name: char.name,
    avatar: char.avatar,
    description: char.description,
  }));

  const links: ForceGraphLink[] = [];

  characters.forEach((char) => {
    char.interactions.forEach((interaction) => {
      const source = char.name;
      const target = interaction.name;

      if (!characters.some((c) => c.name === target)) return;

      const exists = links.some(
        (l) =>
          (l.source === source && l.target === target) ||
          (l.source === target && l.target === source)
      );

      if (!exists) {
        links.push({ source, target, count: interaction.count });
      }
    });
  });

  return { nodes, links };
}
