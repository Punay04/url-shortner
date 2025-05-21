import { redirect } from "next/navigation";
import { urlModel } from "../model/url";

export async function Redirect({ params }: any) {
  const { slug } = params;

  const isPresent = await urlModel.findOne({
    shortUrl: slug,
  });

  if (!isPresent) {
    redirect("/not-found");
  }

  isPresent.clicks += 1;
  await isPresent.save();

  redirect(`/${isPresent.originalUrl}`);
}
