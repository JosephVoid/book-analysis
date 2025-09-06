import React from "react";
import { UserAvatar } from "../assets/avatar";
import { BaselineClose } from "../assets/close";
import { ICardDetail } from "../types";

export default function DetailCard({
  character,
  link,
  onClose,
  open,
}: ICardDetail & { onClose: () => void; open: boolean }) {
  return (
    <div className={`absolute top-2 right-0 z-10 ${open ? "" : "hidden"}`}>
      <div className="bg-white shadow-md p-4 rounded-sm w-64 relative">
        <BaselineClose
          className="absolute top-2 right-2 cursor-pointer"
          onClick={onClose}
        />
        {character && (
          <div className="flex flex-col">
            <div className="flex gap-2 items-center my-2">
              <UserAvatar width={50} height={50} className="opacity-70" />
              <span className="font-bold text-2xl">{character.name}</span>
            </div>
            <p className="text-xs opacity-70">{character.description}</p>
          </div>
        )}
        {link && (
          <div>
            <div className="flex gap-2 justify-around">
              <div className="flex flex-col items-center">
                <UserAvatar width={50} height={50} className="opacity-70" />
                <span className="font-bold text-xl text-center">
                  {link.source.name}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <UserAvatar width={50} height={50} className="opacity-70" />
                <span className="font-bold text-xl text-center">
                  {link.target.name}
                </span>
              </div>
            </div>
            <p className="text-center">
              Interacted {link.count === 1 ? "once" : `${link.count} times`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
