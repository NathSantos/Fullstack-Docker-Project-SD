import React from "react";
import "./TurismoListItem.css";

function Turismo({ turismo, onDeleteTurismo, type }) {
  const classNameType = "TurismoListItem "+type;
  return (
    <li className={classNameType}>
      {turismo.title}
      <button className="TurismoListItem__Delete" onClick={onDeleteTurismo}>
        <img src="/images/delete.svg" alt="Delete turismo" />
      </button>
    </li>
  );
}

export default Turismo;
