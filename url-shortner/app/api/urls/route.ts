import { urlModel } from "@/app/model/url";
import { main } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

interface URLResponse {
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: Date;
}

export async function GET(req: NextRequest) {
  try {
    await main();

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email parameter is required",
        },
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Fetch recent URLs using email as userId
    const urls = await urlModel
      .find({ userId: email })
      .sort({ createdAt: -1 })
      .limit(3)
      .select("originalUrl shortUrl clicks createdAt")
      .lean<URLResponse[]>();

    // Calculate stats
    const totalClicks = urls.reduce((sum, url) => sum + url.clicks, 0);
    const mostClicked = Math.max(...urls.map((url) => url.clicks), 0);

    return NextResponse.json(
      {
        success: true,
        message: urls.length ? "URLs fetched successfully" : "No URLs found",
        data: {
          urls,
          stats: {
            totalUrls: urls.length,
            totalClicks,
            mostClicked,
          },
        },
      },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching URLs:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to fetch URLs",
      },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
