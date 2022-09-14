class TrackDetails {
    constructor(trackUrl, trackName) {
        this._trackUrl = trackUrl;
        this._trackName = trackName;
    }

    getTrackUrl() {
        return this._trackUrl;
    }

    getTrackName() {
        return this._trackName;
    }
}

export default TrackDetails;