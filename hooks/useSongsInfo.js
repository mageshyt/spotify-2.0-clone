import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atom/songAtom";
import useSpotify from "./useSpotify";

const useSongsInfo = () => {
  const spotifyApi = useSpotify();
  // ! to get currentTrackIdState
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  // ! to check the songs is playing or not
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  // ! fetch song info
  const [songInfo, setSongInfo] = useState(null);
  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentTrackId) {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentTrackId}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            },
          }
        ).then((res) => res.json());
        setSongInfo(trackInfo);
      }
    };
    fetchSongInfo();
  }, [currentTrackId, spotifyApi]);
  return songInfo;
};

export default useSongsInfo;
