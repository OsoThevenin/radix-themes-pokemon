import { Box, Button, Card, Flex, Heading, Link, Text } from '@radix-ui/themes';
import { getSignInUrl, getUser } from '@workos-inc/authkit-nextjs';

import Header from '@/app/components/header';
import DeckCreator from '@/components/deck-creator';
import PokemonGrid from '@/components/pokemon-grid';
import { getDecks } from '@/db';

export default async function Home() {
  const { user } = await getUser();
  const signInUrl = await getSignInUrl();

  const decks = await getDecks();

  return (
    <main>
      {user ? (
        <>
          <Header />
          <Heading>Pokemon Deck Builder</Heading>
          <DeckCreator />
          <Flex direction="column" gap="3">
            {decks.map((deck) => (
              <Card key={deck.id} my="2">
                <Link href={`/deck/${deck.id}`}>
                  <Heading as="h2">{deck.name}</Heading>
                  <Box p="2">
                    {deck.cards.length > 0 ? (
                      <PokemonGrid pokemon={deck.cards.slice(0, 5)} />
                    ) : (
                      <Box mb="3">
                        <Text>
                          No Pokemon in this deck, yet. You should add some!
                        </Text>
                      </Box>
                    )}
                  </Box>
                </Link>
              </Card>
            ))}
          </Flex>
        </>
      ) : (
        <Card mt="9">
          <Box p="5">
            <Heading>Sign in to start creating Pokemon Decks</Heading>
            <Box mt="5">
              <Button size="3">
                <a href={signInUrl}>Sign in</a>
              </Button>
            </Box>
          </Box>
        </Card>
      )}
    </main>
  );
}
