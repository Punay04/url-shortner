import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Robo from "@/components/robo";
import { Button } from "@/components/ui/button";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

export default function Home() {
  return (
    <div className="bg-black min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-8 lg:py-16 min-h-[calc(100vh-200px)]">
          <div className="flex flex-col justify-center items-center text-center lg:text-left w-full">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-neutral-300 to-neutral-500 w-full">
              <p className="leading-tight">Shorten Your Links,</p>
              <p className="leading-tight">Expand Your Reach</p>
            </h1>
            <p className="text-green-500 mt-6 font-semibold text-lg sm:text-xl max-w-xl w-full">
              Clean, reliable, and trackable short URLs in seconds.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 w-full">
              <Button
                variant={"outline"}
                className="text-blue-300 font-medium cursor-pointer text-lg sm:text-xl w-full sm:w-auto hover:bg-blue-300 hover:text-white transition-colors"
              >
                Get Started
              </Button>
              <Button
                variant={"destructive"}
                className="bg-blue-300 font-medium cursor-pointer text-lg sm:text-xl text-gray-800 w-full sm:w-auto hover:bg-blue-400 transition-colors"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="flex justify-center items-center w-full">
            <Robo />
          </div>
        </div>
      </div>
      <Hero />
      <Footer />
      <TextHoverEffect text="Brevify" />
    </div>
  );
}
