import { useRecoilState } from "recoil";
import useSpotify from "../hooks/useSpotify";
import { millisecondsToMinutes } from "../lib/time";
import { currentTrackIdState, isPlayingState } from "../atom/songAtom";

const Song = ({ track, order }) => {
  // ! spotifyApi
  const spotifyApi = useSpotify();

  // ! to get currentTrackIdState
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  // ! to check the songs is playing or not
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = async () => {
    setCurrentTrackId(track.track.id); // ! set currentTrackId
    setIsPlaying(true); // ! set isPlaying to true
    spotifyApi.play({
      uris: [track.track.uri],
    });
  };

  return (
    <div
      className="grid grid-cols-2 cursor-pointer px-5 rounded-xl hover:bg-[#121212] transform transition-all duration-150 ease-in"
      onClick={playSong}
    >
      {/* image and artists */}
      {/* left */}
      <div className="flex items-center space-x-4">
        <p className="text-gray-400 font-light text-sm">{order + 1}</p>
        <img
          className="h-10 w-10"
          src={track.track.album.images[0].url}
          alt=""
        />

        <div className="flex flex-col space-y-1">
          <p className="text-gray-400 truncate w-36 lg:w-64 text-sm font-semibold">
            {track.track.name}
          </p>
          <p className="text-gray-500 text-sm font-light w-40 truncate">
            {track.track.artists[0].name}
          </p>
        </div>
      </div>
      {/* middle */}
      <div className="flex items-center justify-between ml-auto md:ml-0">
        {/* album name */}
        <p className="text-gray-400 hidden md:inline-flex text-sm font-semibold">
          {" "}
          {track.track.album.name}
        </p>
        {/* duration */}
        <p className="to-gray-500 text-sm">
          {millisecondsToMinutes(track.track.duration_ms)}
        </p>
      </div>
    </div>
  );
};

export default Song;
