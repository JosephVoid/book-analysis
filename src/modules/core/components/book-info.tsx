import { Book, Character } from "@/src/types";
import { useAsync } from "../hooks/useAsync";
import getCharactersAction from "../../book-analyze/lib/actions/get-characters.actions";
import Spinner from "./spinner";

export default function BookInfo({
  onCharactersSet,
  ...book
}: Book & { onCharactersSet: (characters: Character[]) => void }) {
  const { run: getCharacters, loading: getCharactersLoading } =
    useAsync(getCharactersAction);

  const handleAnalyze = async () => {
    const result = await getCharacters(
      book.formats["text/plain; charset=us-ascii"]
    );
    if (result) {
      onCharactersSet(result);
    }
  };

  return (
    <section className="flex flex-col gap-6 justify-center py-5">
      <h1 className="text-5xl font-extrabold">{book.title}</h1>
      <div className="flex gap-3">
        <div className="w-1/4">
          <img src={book.formats["image/jpeg"]} />
        </div>
        <div className="w-3/4 flex flex-col gap-4">
          <p className="text-xs line-clamp-[8]">{book.summaries.join(" ")}</p>
          <p className="text-xs">
            by
            {book.authors.map((author) => (
              <span key={author.name}> {author.name} </span>
            ))}
          </p>
          <button
            className="btn btn-soft rounded-xs btn-primary"
            onClick={handleAnalyze}
          >
            {getCharactersLoading ? <Spinner /> : "Analyze with Gemini"}
          </button>
        </div>
      </div>
    </section>
  );
}
