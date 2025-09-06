import {
  ForceGraphData,
  ForceGraphLink,
  ForceGraphNode,
} from "../modules/core/types";
import { Character } from "../types";

export function base64ToImage(base64: string): string {
  const parts = base64.split(",");
  const byteString = atob(parts[1]);
  const byteArrays: Uint8Array[] = [];

  for (let offset = 0; offset < byteString.length; offset += 512) {
    const slice = byteString.slice(offset, offset + 512);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: "image/jpeg" });

  const imageURL = URL.createObjectURL(blob);

  return imageURL;
}

export function parseGeminiJSON<T>(response: string): T {
  const cleaned = response.replace(/^```json\s*/, "").replace(/\s*```$/, "");

  return JSON.parse(cleaned) as T;
}

export function charactersToGraphData(characters: Character[]): ForceGraphData {
  const nodes: ForceGraphNode[] = characters.map((char) => ({
    id: char.name,
    name: char.name,
    img: char.avatar,
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
