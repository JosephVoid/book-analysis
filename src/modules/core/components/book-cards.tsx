"use client";

import { IBookCard } from "../types";

export default function BookCard(props: IBookCard) {
  return (
    <div
      className={`card bg-base-100 shadow-sm w-1/5 min-w-[120] cursor-pointer ${
        props.selected ? `outline-4 outline-solid outline-amber-200` : ""
      }`}
      onClick={props.onClick}
    >
      {
        <figure>
          <img
            src={
              "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            }
            alt="Book"
          />
        </figure>
      }
      <div className="card-body p-2">
        <p>{props.title}</p>
      </div>
    </div>
  );
}
