import {
  ClipboardCopyIcon,
  ClipboardPasteIcon,
  Copy,
  Link,
  ShareIcon,
} from "lucide-react";
import { div } from "motion/react-client";
import Image from "next/image";
import React from "react";

const data = [
  {
    logo: ClipboardPasteIcon,
    title: "Paste Your URL",
    description:
      "Drop your long, messy link into the input box. Whether it’s a YouTube video, blog post, or product page, we’ve got you covered.",
  },
  {
    logo: Link,
    title: "Get a Short Link",
    description: `Click “Shorten”, and we’ll instantly generate a clean, shareable URL — like yourdomain.com/abc123.
Custom slugs? Yep, you can create your own too.`,
  },
  {
    logo: ShareIcon,
    title: "Share & Track It",
    description: `Share your short link anywhere: WhatsApp, Instagram, LinkedIn, email.
You can also track how many people clicked it, when, and from where — all in your dashboard.
`,
  },
];

const Hero = () => {
  return (
    <div className="mt-19 bg-black">
      <h1 className="text-gray-300 text-center text-5xl font-bold mb-14">
        How It Works
      </h1>
      <div className="grid grid-cols-2 gap-8 px-8">
        <div className="flex flex-col justify-center items-start">
          {data.map((v, i) => (
            <div
              key={i}
              className="h-1/3 w-full border text-green-300 flex flex-col p-4 gap-3 mb-3 rounded-4xl"
            >
              <div className="rounded-full p-2 text-green-500 w-12 h-12 border flex justify-center items-center">
                <v.logo />
              </div>
              <h1 className="text-gray-300 text-xl font-semibold ">
                {v.title}
              </h1>
              <p className="text-gray-500 text-xl">{v.description}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center">
          <Image
            src={"/image.jpg"}
            alt="image"
            width={1500}
            height={800}
            className="object-contain h-full w-full rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
