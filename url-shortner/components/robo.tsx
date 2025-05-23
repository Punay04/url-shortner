import Spline from "@splinetool/react-spline/next";

export default function Robo() {
  return (
    <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] relative">
      <Spline
        className="w-full h-full"
        scene="https://prod.spline.design/q5Y2KYfgn4WXTm9D/scene.splinecode"
      />
    </div>
  );
}
