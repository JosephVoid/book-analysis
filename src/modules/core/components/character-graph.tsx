"use client";

import dynamic from "next/dynamic";
import { Character } from "@/src/types";
import { charactersToGraphData } from "@/src/utils/helpers";
import React from "react";

const ForceGraph = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});

export default function CharacterGraph({
  characters,
}: {
  characters: Character[];
}) {
  const data = React.useMemo(
    () => charactersToGraphData(characters),
    [characters]
  );

  return (
    <section className="flex flex-col gap-6 justify-center py-5">
      <h3 className="text-2xl font-bold">Characters and Interactions</h3>
      <ForceGraph
        height={300}
        width={700}
        graphData={data}
        backgroundColor="#eeeeee"
        linkWidth={3}
        onNodeClick={(node: any) => console.log({ node })}
        onLinkClick={(line: any) => console.log({ line })}
        nodeCanvasObject={(node: any, ctx, globalScale) => {
          const label = node.id;
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;

          // Draw label
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "black";
          ctx.fillText(label, node.x, node.y + 10);

          // Draw image or circle
          const size = 40 / globalScale;
          if (node.img) {
            const img = new Image();
            img.src = node.img;

            ctx.save();
            ctx.beginPath();
            ctx.arc(node.x, node.y, size / 2, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();

            ctx.drawImage(
              img,
              node.x - size / 2,
              node.y - size / 2,
              size,
              size
            );

            ctx.beginPath();
            ctx.arc(node.x, node.y, size / 2, 0, Math.PI * 2, true);
            ctx.clip();
            ctx.closePath();
            ctx.restore();
          } else {
            // Draw a circle if no image
            ctx.beginPath();
            ctx.arc(node.x, node.y, size / 2, 0, 2 * Math.PI, false);
            ctx.fillStyle = "grey";
            ctx.fill();
          }
        }}
        nodePointerAreaPaint={(node, color, ctx) => {
          const size = 40;
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(node.x!, node.y!, size / 2, 0, 2 * Math.PI, false);
          ctx.fill();
        }}
      />
    </section>
  );
}
