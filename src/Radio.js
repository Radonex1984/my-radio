import React, { useState, useEffect } from "react";
import { RadioBrowserApi } from "radio-browser-api";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import defaultImage from "../radio.png";
import { FaHeart } from "react-icons/fa";

export default function Radio() {
  const [stations, setStations] = useState();
  const [stationFilter, setStationFilter] = useState("");

  useEffect(() => {
    setupApi(stationFilter).then((data) => {
      console.log(data);
      setStations(data);
    });
  }, [stationFilter]);

  const setupApi = async (stationFilter) => {
    const api = new RadioBrowserApi(fetch.bind(window), "my-radio");

    const stations = await api
      .searchStations({
        language: "romanian",
        tag: stationFilter,
      })
      .then((data) => {
        return data;
      });

    return stations;
  };

  const filters = [
    "classical",
    "news",
    "dance",
    "disco",
    "house",
    "pop",
    "retro",
    "rock",
    "music",
  ];

  const setDefaultSrc = (event) => {
    event.target.src = defaultImage;
  };

  return (
    <div className="radio">
      <div className="filters">
        {filters.map((filter, i) => {
          return (
            <span
              className={stationFilter === filter ? "selected" : ""}
              key={i}
              onClick={() => setStationFilter(filter)}
            >
              {filter}
            </span>
          );
        })}
      </div>
      <div className="stations">
        {stations &&
          stations.map((station, id) => {
            return (
              <div className="station" key={id}>
                <div className="stationName">
                  <img
                    className="logo"
                    src={station.favicon}
                    alt="station logo"
                    onError={setDefaultSrc}
                  />
                  <div className="name">{station.name}</div>
                  <div className="fav" tabIndex={1} id="row0">
                    <FaHeart></FaHeart>
                  </div>
                </div>

                <AudioPlayer
                  className="player"
                  src={station.urlResolved}
                  showJumpControls={false}
                  layout="stacked"
                  customProgressBarSection={[]}
                  customControlsSection={["MAIN_CONTROLS", "VOLUME_CONTROLS"]}
                  autoPlayAfterSrcChange={false}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
