import { NextResponse } from "next/server";
import { getPodcastEpisodes } from "@/app/lib/rss";


export async function GET() {

  const episodes = await getPodcastEpisodes();


  return NextResponse.json(
    episodes[0]
  );

}