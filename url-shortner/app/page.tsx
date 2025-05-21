import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Robo from "@/components/robo";
import { Button } from "@/components/ui/button";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

export default function Home() {
  return (
    <div className="bg-black h-full w-full">
      <Navbar />
      <div className="grid grid-cols-2 grid-rows-1 h-screen ">
        <div className="flex justify-center items-center flex-col">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-neutral-300 to-neutral-500">
            <p>Shorten Your Links,</p>
            <p>Expand Your Reach</p>
          </h1>
          <p className="text-green-500 mt-6 font-semibold text-xl">
            Clean, reliable, and trackable short URLs in seconds.
          </p>
          <div className="flex justify-center items-center gap-3 flex-row mt-4 ">
            <Button
              variant={"outline"}
              className="text-blue-300 font-medium cursor-poniter text-xl"
            >
              Get Started
            </Button>
            <Button
              variant={"destructive"}
              className=" 
              bg-blue-300 font-medium cursor-poniter text-xl text-gray-800"
            >
              Learn More
            </Button>
          </div>
        </div>
        <div className="h-full">
          <Robo />
        </div>
      </div>
      <Hero />
      <Footer />
      <TextHoverEffect text="Brevify" />
    </div>
  );
}
