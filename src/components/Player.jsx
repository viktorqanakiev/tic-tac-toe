import { useState } from "react";
export default function Player({
  initialName,
  IsActive,
  symbol,
  onChangeName,
}) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    //the two have the same result - to make it false if its true and to make it true if its false
    //this two are not instant/ also there is another thhing explayned in .78
    //setIsEditing(isEditing ? false : true);
    //setIsEditing(!isEditing);
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }
  //this function return the the event/ or how we named it whcih is an object which contains properties one of which is target. The target is the input element
  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>;
  //let btnCaption = "Edit";
  if (isEditing) {
    editablePlayerName = (
      <input type="text" required value={playerName} onChange={handleChange} />
    );
    //btnCaption = "Save";
  }
  return (
    <li className={IsActive ? "active" : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
