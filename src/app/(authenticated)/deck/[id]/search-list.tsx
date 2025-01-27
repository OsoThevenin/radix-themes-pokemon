'use client';

import { Button, Flex, TextField } from '@radix-ui/themes';
import { useMemo, useState } from 'react';

import PokemonGrid from '@/components/pokemon-grid';
import type { Pokemon } from '@/db';

export default function Search({
  pokemon: initialPokemon,
  existingPokemon,
}: {
  pokemon: Pokemon[];
  existingPokemon: number[];
}) {
  const [query, setQuery] = useState('');
  const [pokemon, setPokemon] = useState(initialPokemon);

  const search = async () => {
    const resp = await fetch(`/searchPokemon?q=${encodeURIComponent(query)}`);
    const data = await resp.json();
    setPokemon(data);
  };

  const filteredPokemon = useMemo(
    () => pokemon.filter((p) => !existingPokemon.includes(+p.pokemonId)),
    [pokemon, existingPokemon],
  );

  return (
    <div>
      <Flex gap="2">
        <TextField.Root
          type="search"
          placeholder="Search for a pokemon"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyUp={(e) => {
            if (e.key !== 'Enter') return;
            search();
          }}
          size="3"
          style={{
            flexGrow: 1,
          }}
        />
        <Button
          onClick={() => {
            search();
          }}
          size="3"
        >
          Search
        </Button>
      </Flex>
      <PokemonGrid pokemon={filteredPokemon} showAdd />
    </div>
  );
}
