import { atom } from "recoil";

// ! for getting currentTrack id
const currentTrackIdState = atom({
  key: "currentTrackIdState",
  default: "",
});

// ! for isPlating state
const isPlayingState = atom({
  key: "isPlayingState",
  default: false,
});

export { currentTrackIdState, isPlayingState };
