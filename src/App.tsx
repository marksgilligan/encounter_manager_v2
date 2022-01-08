import { useState } from "react";
import creatureData from "./creature_data.json";
import "./App.css";
import SearchResult from "./components/SearchResult";
import EncounterList from "./components/EncounterList";

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [encounterList, setEncounterList] = useState<any>([]);
  const [searchResult, setSearchResult] = useState<any>([]);
  const [currentPlayer, setCurrentPlayer] = useState<number>(0);

  function searchCreatures(searchTerm: string) {
    const result = creatureData.data.filter((item: any) => {
      return searchTerm === item.id;
    });
    if (result.length > 0) {
      setSearchTerm("");
      setSearchResult(result[0]);
    }
  }
  function handleChange(event: any) {
    setSearchTerm(event.target.value);
  }
  function handleKeyDown(event: any) {
    if (event.keyCode === 13) {
      searchCreatures(searchTerm);
    }
  }
  function rollInit(min: any, max: any) {
    min = Math.ceil(min);
    max = Math.floor(max);
    const d20 = Math.floor(Math.random() * (max - min + 1)) + min;
    const dexMod = modifier(searchResult.dexterity);
    return d20 + dexMod;
  }
  function addToEncounter(creature: any) {
    const creatureCopy = JSON.parse(JSON.stringify(creature));
    creatureCopy.notes = "";
    creatureCopy.initiative = rollInit(1, 20);
    setEncounterList([...encounterList, creatureCopy]);
  }
  function modifier(value: number) {
    return Math.floor((value - 10) / 2);
  }
  function sortList() {
    const newOrder = [...encounterList];
    newOrder.sort(
      (a, b) =>
        b.initiative - a.initiative ||
        b.dexterity +
          modifier(b.dexterity) -
          (a.dexterity + modifier(a.dexterity))
    );
    setEncounterList(newOrder);
  }
  function nextTurn() {
    if (encounterList.length === currentPlayer + 1) {
      setCurrentPlayer(0);
    } else setCurrentPlayer(currentPlayer + 1);
  }

  return (
    <div className="App">
      <div className="encounter-container">
        <EncounterList
          currentPlayer={currentPlayer}
          encounterList={encounterList}
          setEncounterList={setEncounterList}
          modifier={modifier}
          setSearchResult={setSearchResult}
        />
      </div>
      <div className="details-container">
        <div className="result-container">
          <SearchResult modifier={modifier} searchResult={searchResult} />
        </div>
        <div className="search-container">
          <input
            value={searchTerm}
            placeholder="Monster Name"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <button onClick={() => searchCreatures(searchTerm)}>Search</button>
          {searchResult.name ? (
            <button onClick={() => addToEncounter(searchResult)}>
              Add to Encounter
            </button>
          ) : null}
          <button onClick={sortList}>Sort List</button>
          <button onClick={nextTurn}>Next Turn</button>
          <div className="quickList">
            {
              encounterList.map((item: any, index: number)=>{
                return <div className={`quickListItem ${(index === currentPlayer) ? 'selected' : null}`}>{item.name} - HP: {item?.hit_points.value}</div>
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
