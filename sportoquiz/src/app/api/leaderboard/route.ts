// This makes the API run in plain Node (not Edge)
export const runtime = 'nodejs';


// src/app/api/leaderboard/route.ts
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// POST /api/leaderboard → record a new score
export async function POST(request: Request) {
    const body = await request.json();
    console.log('📝 POST /api/leaderboard body:', body);

    // pull "sport" from the payload and write it into the "league" column
    const { username, sport, difficulty, score, totalQuestions } = body;
    const { data, error } = await supabaseAdmin
        .from('leaderboard')
        .insert({
        username,
        league: sport,        // ← use sport here
        difficulty,
        score,
        total_questions: totalQuestions,
    });

    if (error) {
    // 2) log the Supabase error object
    console.error('❌ Supabase insert error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 3) confirm success
    console.log('✅ Supabase insert succeeded:', data);
    return NextResponse.json({ success: true });
}

// GET  /api/leaderboard → fetch top 50 all‑time scores
export async function GET(request: Request) {
  try {
    const url       = new URL(request.url);
    const league    = url.searchParams.get('league');      // e.g. "NFL" or null
    const timeframe = url.searchParams.get('timeframe');   // "week" | "month" | "alltime" | null

    let query = supabaseAdmin
      .from('leaderboard')
      .select('username,league,difficulty,score,created_at');

    if (league && league !== 'all') {
      query = query.eq('league', league);
    }
    if (timeframe === 'week') {
      const since = new Date(Date.now() - 7*24*60*60*1000).toISOString();
      query = query.gte('created_at', since);
    } else if (timeframe === 'month') {
      const since = new Date(Date.now() - 30*24*60*60*1000).toISOString();
      query = query.gte('created_at', since);
    }

    const { data, error } = await query
      .order('score', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Supabase error:', error);
      // return an empty array instead of an object
      return NextResponse.json([], { status: 200 });
    }

    // always return an array
    return NextResponse.json(data || [], { status: 200 });

  } catch (err) {
    console.error('Unexpected error in GET /api/leaderboard:', err);
    return NextResponse.json([], { status: 200 });
  }
}
