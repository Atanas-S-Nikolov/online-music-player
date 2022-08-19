import { createContext } from "react";

const TrackContext = createContext({
    currentTrackUrl: "",
    updateTrackUrl: () => {}
})

export default TrackContext;
