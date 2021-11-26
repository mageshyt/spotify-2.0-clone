import Head from "next/head";
import Slider from "../components/Slider";

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        {" "}
        <title>Spotify clone</title>
      </Head>
      <main>
        {/* slider */}
        <Slider />
        {/* Center */}
      </main>
      <div>{/* Player */}</div>
    </div>
  );
}
