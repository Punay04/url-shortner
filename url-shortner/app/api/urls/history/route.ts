import { urlModel } from "@/app/model/url";
import { main } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

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
        { status: 400 }
      );
    }

    const urls = await urlModel
      .find({ userId: email })
      .sort({ createdAt: -1 })
      .select("originalUrl shortUrl clicks createdAt");

    return NextResponse.json({
      success: true,
      urls,
    });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch URLs",
      },
      { status: 500 }
    );
  }
}
