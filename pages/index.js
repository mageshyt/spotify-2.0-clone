import Head from "next/head";
import Slider from "../components/Slider";

export default function Home() {
  return (
    <div className="flex bg-[#121212] flex-col items-center justify-center min-h-screen py-2">
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
