import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atom/songAtom";
import useSongsInfo from "../hooks/useSongsInfo";
import useSpotify from "../hooks/useSpotify";
// ! icons
import {
  ReplyIcon,
  SwitchHorizontalIcon,
  VolumeUpIcon,
} from "@heroicons/react/outline";
import {
  FastForwardIcon,
  PlayIcon,
  PauseIcon,
  RewindIcon,
  VolumeUpIcon as VolumeDownIcon,
} from "@heroicons/react/solid";
import { debounce } from "lodash";
export const Player = () => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  // ! to get currentTrackIdState
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  // ! to check the songs is playing or not
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  // ! to get the current song info
  const songInfo = useSongsInfo();

  // ! for volume
  const [volume, setVolume] = useState(50); // ! default volume is
  // ! fetch current song
  const fetchSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        setCurrentTrackId(data.item?.id);

        // ! to check the songs is playing or not
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.is_playing);
        });
      });
    }
  };
  // ! for fetching the current song when we click
  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchSong();
      setVolume(50);
    }
  }, [currentTrackId, spotifyApi, session]);

  // ! to play pause the song
  const playPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.is_playing) {
        spotifyApi.pause();
      } else {
        spotifyApi.play();
      }
    });
    setIsPlaying(!isPlaying);
  };

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume);
      // ! change the volume after 500 milliseconds
    }, 500),
    []
  );
  // ! changes volume
  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume]);

  return (
    <div
      className="h-24 bg-gradient-to-b
     text-white from-black to-gray-900
     grid grid-cols-3 text-xs md:text-base md:px-8
     "
    >
      {/* Left side */}
      <div className="flex items-center text-xs space-x-3">
        <img
          src={songInfo?.album.images?.[0].url}
          alt=""
          className="h-12 hidden md:inline-flex w-12 rounded-full  border-2 border-red-500"
        />
        {/* song name */}
        <div className="space-y-2">
          <h2>{songInfo?.name}</h2>
          <p>{songInfo?.artists?.[0].name}</p>
        </div>
      </div>

      {/* middle session */}
      {/* Icons */}
      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="button" />
        <RewindIcon
          // onClick={() => spotifyApi.skipToPrevious()}
          className="button"
        />

        {isPlaying ? (
          <PauseIcon onClick={playPause} className="button w-10 h-10" />
        ) : (
          <PlayIcon onClick={playPause} className="button h-10 w-10" />
        )}
        <FastForwardIcon
          onClick={() => spotifyApi.skipToNext()}
          className="button"
        />
        <ReplyIcon className="button" />
      </div>

      {/* right side volume */}
      <div
        className="flex items-center
       justify-end pr-5
       md:space-x-4
        space-x-4"
      >
        <VolumeDownIcon
          onClick={() => volume > 0 && setVolume(volume - 10)}
          className="button"
        />
        <input
          className="w-14 md:w-28"
          type="range"
          min={0}
          onChange={(e) => setVolume(e.target.value)}
          max={100}
          value={volume}
        />
        <VolumeUpIcon
          onClick={() => volume < 100 && setVolume(volume + 10)}
          className="button"
        />
      </div>
    </div>
  );
};
