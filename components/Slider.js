import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
const Slider = () => {
  const { data: session, status } = useSession();
  console.log(" 🔥 session", session);
  return (
    <div className="text-gray-500 p-5 text-sm border-r border-gray-900">
      {/* Icons container */}
      <div className="space-y-4">
        {/* Home */}
        <button
          onClick={() => signOut()}
          className="flex  items-center space-x-2 hover:text-white "
        >
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
        <p className="cursor-pointer hover:text-white">PlayList name ....</p>
        <p className="cursor-pointer hover:text-white">PlayList name ....</p>
        <p className="cursor-pointer hover:text-white">PlayList name ....</p>
        <p className="cursor-pointer hover:text-white">PlayList name ....</p>
        <p className="cursor-pointer hover:text-white">PlayList name ....</p>
        <p className="cursor-pointer hover:text-white">PlayList name ....</p>
        <p className="cursor-pointer hover:text-white">PlayList name ....</p>
        <p className="cursor-pointer hover:text-white">PlayList name ....</p>
      </div>
    </div>
  );
};

export default Slider;
