"use client";

import dynamic from "next/dynamic";
import { Character } from "@/src/types";
import { charactersToGraphData, loadAvatars } from "@/src/utils/helpers";
import React from "react";
import DetailCard from "./detail-card";
import { ICardDetail } from "../types";
import CharacterProvider, { AppContext } from "@/src/utils/app-provider";

const ForceGraph = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});

export default function CharacterGraph({
  characters,
}: {
  characters: Character[];
}) {
  const [detail, setDetail] = React.useState<ICardDetail | null>(null);
  const characterContext = React.useContext(AppContext);

  const data = React.useMemo(() => {
    const characterAvatars = characterContext?.characters;
    return charactersToGraphData(
      characters.map((char) => ({
        ...char,
        avatar: characterAvatars?.find((chrtr) => chrtr.name === char.name)
          ?.avatar,
      }))
    );
  }, [characters, characterContext?.characters]);

  const handleNodeClick = (node: any) => {
    setDetail({ character: node as Character });
  };

  const handleLineClick = (link: any) => {
    console.log({ link });
    setDetail({
      link: { source: link.source, target: link.target, count: link.count },
    });
  };

  return (
    <section
      className="flex flex-col gap-4 justify-center py-5 h-screen"
      id="graph"
    >
      <div>
        <h3 className="text-2xl font-bold mb-0">
          Characters and their Interactions
        </h3>
        <p className="text-xs m-0">
          Click on a character or connection to know more
        </p>
      </div>
      <div className="relative">
        {detail && (
          <DetailCard
            onClose={() => setDetail(null)}
            character={detail?.character}
            link={detail?.link}
            open={!!detail}
          />
        )}
        <ForceGraph
          width={700}
          height={500}
          graphData={data}
          backgroundColor="#f7f7f7"
          linkWidth={(link) => link.count * 3}
          onNodeClick={handleNodeClick}
          onLinkClick={handleLineClick}
          nodeCanvasObject={(node: any, ctx, globalScale) => {
            const label = node.id;
            const fontSize = 12 / globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;

            // Draw label
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "black";
            ctx.fillText(label, node.x, node.y + 15);

            // Draw image or circle
            const size = 40 / globalScale;
            if (node.avatar) {
              const img = new Image();
              img.src = node.avatar;

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
            const size = 20;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(node.x!, node.y!, size / 2, 0, 2 * Math.PI, false);
            ctx.fill();
          }}
        />
      </div>
    </section>
  );
}
