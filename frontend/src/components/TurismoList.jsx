import React from "react";
import TurismoListItem from "./TurismoListItem";
import "./TurismoList.css";

function TurismoList({ turismos, onDeleteTurismo, type }) {
  return (
    <ul className="TurismoList">
      {turismos.map((turismo) => (
        <TurismoListItem
          key={turismo._id}
          turismo={turismo}
          onDeleteTurismo={() => onDeleteTurismo(turismo)}
          type = {type}
        />
      ))}
    </ul>
  );
}

export default TurismoList;
