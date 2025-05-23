import { urlModel } from "@/app/model/url";
import { main } from "@/lib/db";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { originalUrl, userId } = await req.json();
  const shortId = nanoid(6);

  if (!originalUrl || !userId) {
    return NextResponse.json(
      {
        success: false,
        message: "Missing required fields",
      },
      { status: 400 }
    );
  }

  await main();

  try {
    const newUrl = await urlModel.create({
      originalUrl,
      shortUrl: `${process.env.BASE_URL}${shortId}`,
      userId,
    });
    console.log("url created");
    return NextResponse.json({
      success: true,
      shortUrl: newUrl.shortUrl,
    });
  } catch (error) {
    console.error("Error shortening URL:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to shorten URL",
      },
      { status: 500 }
    );
  }
}

export async function GET() {}
