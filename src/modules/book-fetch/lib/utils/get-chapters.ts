export function getText(bookText: string) {
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

  return cleanText.slice(0, 60000);
}
