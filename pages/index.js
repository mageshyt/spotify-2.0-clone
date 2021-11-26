import Head from "next/head";
import Center from "../components/Center";
import Slider from "../components/Slider";

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        {" "}
        <title>Spotify clone</title>
      </Head>
      <main className="flex">
        {/* slider */}
        <Slider />
        {/* Center */}
        <Center />
      </main>
      <div>{/* Player */}</div>
    </div>
  );
}
