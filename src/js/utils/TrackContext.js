import { createContext } from "react";

const TrackContext = createContext({
    currentTrackRef: undefined,
    currentTrackIndex: 0,
    currentTrackName: "",
    currentTrackUrl: "",
    tracks: [],
    updateCurrentTrackIndex: () => {},
    updateCurrentTrackName: () => {},
    updateCurrentTrackUrl: () => {},
    updateTracks: () => {}
})

export default TrackContext;
