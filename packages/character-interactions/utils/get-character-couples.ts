export function getCharacterCouples(
  characters: { id: string; name: string }[]
) {
  return characters.map((character, index) =>
    characters
      .filter((ch, chIndex) => ch.id !== character.id && chIndex < index)
      .map((characterMate) => [character, characterMate])
  );
}
