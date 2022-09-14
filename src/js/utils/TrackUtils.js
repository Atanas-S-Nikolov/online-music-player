import TrackDetails from "./TrackDetails";

function getTrackDetails(track) {
    const host = track._service._host;
    const bucket = track._location.bucket;
    const trackName = track._location.path;
    return new TrackDetails(`https://${host}/v0/b/${bucket}/o/${trackName}?alt=media`, trackName);
}

export { getTrackDetails };