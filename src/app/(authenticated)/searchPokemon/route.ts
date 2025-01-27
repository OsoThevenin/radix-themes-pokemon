import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { getFullPokemon } from '@/lib/pokemon';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const q = url.searchParams.get('q') ?? '';
  const limit = url.searchParams.get('limit') ?? 10;
  return NextResponse.json(await getFullPokemon(+limit, q));
}
