import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atom/playlistAtom";
import useSpotify from "../hooks/useSpotify";
const Slider = () => {
  const { data: session, status } = useSession();
  //  ! playlist
  const [playlist, setPlaylist] = useState([]);

  //! Playlist id transfer using recoil
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  const spotifyApi = useSpotify();
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((res) => {
        setPlaylist(res.items);
      });
    }
  }, [session]);
  console.log(playlistId);
  return (
    <div
      className=" h-screen 
    overflow-y-scroll scrollbar-hide
     text-gray-500 p-5 text-xs lg:text-sm border-r
      border-gray-900
      sm:max-w-[12rem]
      lg:max-w-[15rem]
      hidden 
      md:inline
      "
    >
      {/* Icons container */}
      <div className="space-y-4">
        {/* Home */}
        {session && (
          <button
            onClick={() => signOut()}
            className="flex  items-center space-x-2 hover:text-white "
          >
            <LogoutIcon className="h-5 w-5" />
            <p>Sign out</p>
          </button>
        )}

        <button className="flex  items-center space-x-2 hover:text-white ">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        {/* Search */}
        <button className="flex  items-center space-x-2 hover:text-white ">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        {/* Library */}
        <button className="flex  items-center space-x-2 hover:text-white ">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>
        {/* Add */}

        <hr className="border-t-[0.1px] border-gray-900" />
        {/* second */}
        <button className="flex  items-center space-x-2 hover:text-white ">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>

        <button className="flex  items-center space-x-2 hover:text-white ">
          <HeartIcon className="h-5 w-5" />
          <p>Liked Songs</p>
        </button>
        {/* Search */}
        <button className="flex  items-center space-x-2 hover:text-white ">
          <RssIcon className="h-5 w-5" />
          <p>Your episode</p>
        </button>
        {/* Library */}
        <hr className=" border-t-[0.1px] border-gray-900" />
        {/* PlayList */}
        {playlist.map(({ name, id }) => (
          <p
            key={id}
            onClick={() => setPlaylistId(id)}
            className="cursor-pointer hover:text-white"
          >
            {name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Slider;
