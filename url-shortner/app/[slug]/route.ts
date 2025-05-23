import { urlModel } from "@/app/model/url";
import { main } from "@/lib/db";

type Props = {
  params: { slug: string };
};

export async function GET(request: Request, props: Props) {
  try {
    await main();

    const shortUrl = `${process.env.BASE_URL}${props.params.slug}`;

    const url = await urlModel.findOne({ shortUrl });

    if (!url) {
      return new Response(null, {
        status: 307,
        headers: {
          Location: "/not-found",
        },
      });
    }

    // Increment clicks
    await urlModel.updateOne(
      { shortUrl },
      { $inc: { clicks: 1 } }
    );

    return new Response(null, {
      status: 307,
      headers: {
        Location: url.originalUrl,
      },
    });
  } catch (error) {
    console.error("Error in redirect:", error);
    return new Response(null, {
      status: 307,
      headers: {
        Location: "/not-found",
      },
    });
  }
}