import {
  ClipboardPasteIcon,
  Link,
  ShareIcon,
} from "lucide-react";
import Image from "next/image";
import React from "react";

const data = [
  {
    logo: ClipboardPasteIcon,
    title: "Paste Your URL",
    description:
      "Drop your long, messy link into the input box. Whether it's a YouTube video, blog post, or product page, we've got you covered.",
  },
  {
    logo: Link,
    title: "Get a Short Link",
    description: `Click "Shorten", and we'll instantly generate a clean, shareable URL — like yourdomain.com/abc123.
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
      <h1 className="text-gray-300 text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-14">
        How It Works
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 px-4 md:px-8">
        <div className="flex flex-col justify-center items-start space-y-4 md:space-y-6">
          {data.map((v, i) => (
            <div
              key={i}
              className="w-full border text-green-300 flex flex-col p-4 gap-3 rounded-4xl"
            >
              <div className="rounded-full p-2 text-green-500 w-10 h-10 md:w-12 md:h-12 border flex justify-center items-center">
                <v.logo className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h1 className="text-gray-300 text-lg md:text-xl font-semibold">
                {v.title}
              </h1>
              <p className="text-gray-500 text-base md:text-lg">
                {v.description}
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center mt-6 lg:mt-0">
          <Image
            src={"/image.jpg"}
            alt="image"
            width={1500}
            height={800}
            className="object-contain h-full w-full rounded-md"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
