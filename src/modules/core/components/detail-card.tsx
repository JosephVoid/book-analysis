"use client";

import React from "react";
import { UserAvatar } from "../assets/avatar";
import { BaselineClose } from "../assets/close";
import { ICardDetail } from "../types";
import { useAsync } from "../hooks/useAsync";
import generateAvatarAction from "../../book-analyze/lib/actions/generate-avatars.action";
import Spinner from "./spinner";
import { AppContext } from "@/src/utils/app-provider";
import getInteractionAction from "../../book-analyze/lib/actions/get-interaction.action";
import { cache } from "../../book-fetch/lib/utils/cache";
import { extractUsage } from "@/src/utils/helpers";

export default function DetailCard({
  character,
  link,
  onClose,
  open,
}: ICardDetail & { onClose: () => void; open: boolean }) {
  const [characterImage, setCharacterImage] = React.useState<string | null>(
    null
  );

  const characterContext = React.useContext(AppContext);

  const { run: generateAvatar, loading: generateAvatarLoading } =
    useAsync(generateAvatarAction);

  const { data: interactionData, loading: interactionLoading } = useAsync(
    React.useCallback(
      async (
        title: string | null,
        char1: string | null,
        char2: string | null
      ) => {
        const response = await cache(getInteractionAction, title, char1, char2);
        const result = extractUsage({
          response: response,
          counter: characterContext?.tokenCounter!,
        });
        return result;
      },
      []
    ),
    true,
    [
      characterContext?.book?.title ?? null,
      link?.source.name ?? null,
      link?.target.name ?? null,
    ]
  );

  const handleCharacterVisualize = async () => {
    if (character) {
      const response = await generateAvatar(character);
      const result = extractUsage({
        response: response,
        counter: characterContext?.tokenCounter!,
      });
      if (result) {
        characterContext?.characterSetter({ ...character, avatar: result });
        setCharacterImage(result);
      }
    }
  };

  React.useEffect(() => {
    setCharacterImage(character?.avatar ?? null);
  }, [character]);

  return (
    <div className={`absolute top-2 right-0 z-10 ${open ? "" : "hidden"}`}>
      <div className="bg-white shadow-md p-4 rounded-sm w-64 relative">
        <BaselineClose
          className="absolute top-2 right-2 cursor-pointer"
          onClick={onClose}
        />
        {character && (
          <div className="flex flex-col gap-2">
            {characterImage ? (
              <div className="flex flex-col gap-2 items-center my-2">
                <img src={characterImage} alt="avatar" />
                <span className="font-bold text-2xl">{character.name}</span>
              </div>
            ) : (
              <div className="flex gap-2 items-center my-2">
                <UserAvatar width={50} height={50} className="opacity-70" />
                <span className="font-bold text-2xl">{character.name}</span>
              </div>
            )}
            <p className="text-xs opacity-70">{character.description}</p>
            <button
              className="btn btn-soft btn-primary"
              onClick={handleCharacterVisualize}
              disabled={!!characterImage}
            >
              {generateAvatarLoading ? <Spinner /> : "Visualize Character"}
            </button>
          </div>
        )}
        {link && (
          <div>
            <div className="flex gap-2 justify-around">
              <div className="flex flex-col items-center">
                {link.source.avatar ? (
                  <img
                    src={link.source.avatar}
                    alt="avatar"
                    height={50}
                    width={50}
                  />
                ) : (
                  <UserAvatar width={50} height={50} className="opacity-70" />
                )}
                <span className="font-bold text-xl text-center">
                  {link.source.name}
                </span>
              </div>
              <div className="flex flex-col items-center">
                {link.target.avatar ? (
                  <img
                    src={link.target.avatar}
                    alt="avatar"
                    height={50}
                    width={50}
                  />
                ) : (
                  <UserAvatar width={50} height={50} className="opacity-70" />
                )}
                <span className="font-bold text-xl text-center">
                  {link.target.name}
                </span>
              </div>
            </div>
            <p className="text-center">
              Interacted {link.count === 1 ? "once" : `${link.count} times`}
            </p>
            {!interactionLoading ? (
              <p className="text-xs text-center my-2 italic">
                {interactionData as string}
              </p>
            ) : (
              <div className="flex justify-center">
                <Spinner />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
