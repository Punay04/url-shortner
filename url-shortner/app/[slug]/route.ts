import { urlModel } from "@/app/model/url";
import { main } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: any) {
  try {
    await main();

    const { slug } = context.params;

    const baseUrl = process.env.BASE_URL?.endsWith('/')
      ? process.env.BASE_URL
      : `${process.env.BASE_URL}/`;

    const shortUrl = `${baseUrl}${slug}`;
    const url = await urlModel.findOne({ shortUrl });

    if (!url) {
      return NextResponse.redirect(new URL("/not-found", request.url));
    }

    await urlModel.updateOne({ shortUrl }, { $inc: { clicks: 1 } });

    return NextResponse.redirect(url.originalUrl);
  } catch (error) {
    console.error("Error in redirect:", error);
    return NextResponse.redirect(new URL("/not-found", request.url));
  }
}