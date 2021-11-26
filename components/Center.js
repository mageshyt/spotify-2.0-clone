import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { playlistIdState, playlistState } from "../atom/playlistAtom";
import useSpotify from "../hooks/useSpotify";
const Center = () => {
  const { data: session } = useSession();
  // !colors
  const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500",
  ];
  //! spotify api
  const spotifyApi = useSpotify();
  const [color, SetColor] = useState(null);
  // !get the playlist id when we click

  const playlistId = useRecoilValue(playlistIdState);

  // ! playlist setPlaylist
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  useEffect(() => {
    const random = Math.floor(Math.random() * colors.length);
    SetColor(colors[random]);
  }, [playlistId]);

  // ! get the songs in the playlist
  useEffect(() => {
    spotifyApi.getPlaylist(playlistId).then((res) => {
      setPlaylist(res);
    });
  }, [playlistId]);

  console.log(playlist);
  return (
    <div className="  flex-grow">
      {/* header */}
      <header>
        {/* user */}
        <div
          className="flex absolute  p-0.5 top-5 
        right-8 text-white rounded-full pr-2 bg-black space-x-3 justify-center opacity-90
         hover:opacity-80 items-center"
        >
          <img
            className="w-10 rounded-full h-10 "
            src={
              session?.user?.image ||
              "https://yt3.ggpht.com/yti/APfAmoHbKoAeEXXrRTErK9XKuQPTALV321TVh3TtuRh6=s88-c-k-c0x00ffffff-no-rj-mo"
            }
            alt="user image"
          />
          {/* user name */}
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
      <section
        className={`flex items-center  space-x-7 
        bg-gradient-to-b ${color} to-black h-80 p-8`}
      >
        {/* playlist images*/}
        <img
          src={playlist?.images?.[0].url}
          className="h-44 w-44 shadow-2xl"
          alt=""
        />

        <div>
          <p className="text-white uppercase">playlist</p>
          <h1 className="text-white font-bold text-2xl md:text-3xl xl:text-5x;">
            {playlist?.name}
          </h1>
        </div>
      </section>
    </div>
  );
};

export default Center;
