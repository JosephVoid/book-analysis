export function getFirstTwoChapters(bookText: string) {
  const MIN_CHAPTER_LEN = 2000;

  const startMatch = bookText.match(
    /\*\*\* START OF THIS PROJECT GUTENBERG EBOOK.*\*\*\*/i
  );
  const endMatch = bookText.match(
    /\*\*\* END OF THIS PROJECT GUTENBERG EBOOK.*\*\*\*/i
  );

  let cleanText = bookText;
  if (startMatch?.index && endMatch) {
    cleanText = bookText.slice(
      startMatch.index + startMatch[0].length,
      endMatch.index
    );
  }

  const chapterRegex = /(chapter\s+(\d+|[ivxlcdm]+)[^\n]*)/gi;
  const parts = cleanText.split(chapterRegex);

  if (parts.length > 1) {
    let chapters = [];
    for (let i = 1; i < parts.length; i += 3) {
      const title = parts[i];
      const body = parts[i + 1] || "";
      const fullChapter = (title + " " + body).trim();
      chapters.push(fullChapter);
    }

    if (
      chapters.length >= 2 &&
      chapters[0].length >= MIN_CHAPTER_LEN &&
      chapters[1].length >= MIN_CHAPTER_LEN
    ) {
      return chapters.slice(0, 2).join("\n\n");
    }
  }

  return cleanText.slice(0, 30000);
}
