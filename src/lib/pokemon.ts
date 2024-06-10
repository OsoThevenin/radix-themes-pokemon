import type { Pokemon } from '@/db';

function upperCaseFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function summarizePokemon(pokemon: any): Pokemon {
  return {
    name: upperCaseFirstLetter(pokemon.name),
    pokemonId: pokemon.id,
    image:
      pokemon.sprites?.other?.['official-artwork']?.front_default ||
      pokemon.sprites.front_default,
  };
}

export async function getFullPokemon(
  limit: number = 10,
  q?: string,
): Promise<Pokemon[]> {
  const resp = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${
      q ? 10000 : limit || 10
    }&offset=0`,
  );
  const json = await resp.json();

  let { results } = json;
  if (q) {
    results = results
      .filter(({ name }: { name: string }) => name.includes(q))
      .slice(0, +limit);
  }

  return Promise.all(
    results.slice(0, +limit).map(async ({ url }: { url: string }) => {
      const response = await fetch(url);
      return summarizePokemon(await response.json());
    }),
  );
}

export async function getPokemon(id: number): Promise<Pokemon> {
  const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return summarizePokemon(await resp.json());
}
