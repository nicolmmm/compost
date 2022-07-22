import React from "react";

export function Home() {
  return (
    <div className="home-body">
      <div className="jumbotron col-8">
        <h6>comPost is a community</h6>
        <p>
          Composting food and organic waste at home is one of the best ways to
          prevent waste and enable a circular food economy. comPOST connects
          people who can recycle organise waste at home with those who cannot,
          and redistributes the product of the organise recycling
        </p>
        <button
          className="homepage-btn btn  btn-outline-info"
          style={{ cursor: "pointer" }}
          type="submit"
        >
          Find Recycling Stations
        </button>
        <button
          className="homepage-btn btn  btn-outline-info"
          style={{ cursor: "pointer" }}
          type="submit"
        >
          Post Recycling Stations
        </button>
      </div>
    </div>
  );
}
