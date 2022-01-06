import "./EncounterList.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import HitPoints from "./HitPoints";
import Notes from "./Notes";

interface EncounterListType {
  encounterList: any;
  setEncounterList: any;
  modifier: any;
  setSearchResult: any;
  currentPlayer: number;
}

export default function EncounterList({
  currentPlayer,
  encounterList,
  setEncounterList,
  modifier,
  setSearchResult,
}: EncounterListType) {
  function handleOnDragEnd(result: any) {
    if (!result.destination) return;
    const items = Array.from(encounterList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setEncounterList(items);
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="encounter-list" direction="horizontal">
        {(provided) => (
          <div
            className="encounter-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {encounterList.map((creature: any, index: number) => {
              const unique_id = creature.id + index;
              console.log(creature);
              return (
                <Draggable
                  key={unique_id}
                  draggableId={unique_id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      className={`creature-block ${
                        currentPlayer === index ? "selected" : null
                      }`}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="encounter_title">{creature.name}</div>
                      <div className="encounter_top">
                        <div className="encounter_title">
                          AC{creature.armor_class.value}
                        </div>
                        <HitPoints creature={creature} />
                        <span className="encounter_title">
                          Init {creature.initiative}
                        </span>
                      </div>
                      <hr />
                      <span className="encounter_subtitle">STR: </span>
                      <span>
                        {creature.strength}{" "}
                        {`${
                          modifier(creature.strength) >= 0
                            ? `(+${modifier(creature.strength)})`
                            : `(-${modifier(creature.strength)})`
                        }`}{" "}
                        &nbsp;&nbsp;{" "}
                      </span>
                      <span className="encounter_subtitle">DEX: </span>
                      <span>
                        {creature.dexterity}{" "}
                        {`${
                          modifier(creature.dexterity) >= 0
                            ? `(+${modifier(creature.dexterity)})`
                            : `(-${modifier(creature.dexterity)})`
                        }`}{" "}
                        &nbsp;&nbsp;{" "}
                      </span>
                      <span className="encounter_subtitle">CON: </span>
                      <span>
                        {creature.constitution}{" "}
                        {`${
                          modifier(creature.constitution) >= 0
                            ? `(+${modifier(creature.constitution)})`
                            : `(-${modifier(creature.constitution)})`
                        }`}{" "}
                      </span>
                      <br />
                      <span className="encounter_subtitle">INT: </span>
                      <span>
                        {creature.intelligence}{" "}
                        {`${
                          modifier(creature.intelligence) >= 0
                            ? `(+${modifier(creature.intelligence)})`
                            : `(-${modifier(creature.intelligence)})`
                        }`}{" "}
                        &nbsp;&nbsp;{" "}
                      </span>
                      <span className="encounter_subtitle">WIS: </span>
                      <span>
                        {creature.wisdom}{" "}
                        {`${
                          modifier(creature.wisdom) >= 0
                            ? `(+${modifier(creature.wisdom)})`
                            : `(-${modifier(creature.wisdom)})`
                        }`}{" "}
                        &nbsp;&nbsp;{" "}
                      </span>
                      <span className="encounter_subtitle">CHA: </span>
                      <span>
                        {creature.charisma}{" "}
                        {`${
                          modifier(creature.charisma) >= 0
                            ? `(+${modifier(creature.charisma)})`
                            : `(-${modifier(creature.charisma)})`
                        }`}{" "}
                        &nbsp;&nbsp;
                      </span>
                      <hr />
                      <div className="speed">
                        {creature.speed.map((speedItem: any, index: number) => {
                          return (
                            <>
                              <span className="encounter_subtitle">
                                {speedItem.name}:{" "}
                              </span>
                              <span>
                                {speedItem.distance}ft
                                {speedItem.note ? ` (${speedItem.note})` : null}
                                {index !== creature.speed.length - 1
                                  ? ", "
                                  : null}
                              </span>
                            </>
                          );
                        })}
                      </div>
                      {creature.saving_throws ? (
                        <div>
                          <span className="encounter_subtitle">
                            Saving Throws:
                          </span>
                          {creature.saving_throws?.map(
                            (saving_throw_item: any) => {
                              return (
                                <span>
                                  {" "}
                                  {saving_throw_item.name}:{" "}
                                  {saving_throw_item.value > 0
                                    ? `+${saving_throw_item.value}`
                                    : saving_throw_item.value}
                                  ,{" "}
                                </span>
                              );
                            }
                          )}
                        </div>
                      ) : null}
                      {creature.damage_vulnerabilties ? (
                        <div className="damage-vulnerabilties">
                          <span className="encounter_subtitle">
                            Damage Res:
                          </span>{" "}
                          {creature.damage_vulnerabilties?.map(
                            (damage_vulnerabilty_item: any) => {
                              return <span>{damage_vulnerabilty_item}, </span>;
                            }
                          )}
                        </div>
                      ) : null}
                      {creature.damage_resistances ? (
                        <div className="damage-resitances">
                          <span className="encounter_subtitle">
                            Damage Res:
                          </span>{" "}
                          {creature.damage_resistances?.map(
                            (damage_resistance_item: any) => {
                              return <span>{damage_resistance_item}, </span>;
                            }
                          )}
                        </div>
                      ) : null}
                      {creature.damage_immunities ? (
                        <div className="damage-immunities">
                          <span className="encounter_subtitle">
                            Damage Imm:
                          </span>{" "}
                          {creature.damage_immunities?.map(
                            (damage_immunities_item: any) => {
                              return <span>{damage_immunities_item}, </span>;
                            }
                          )}
                        </div>
                      ) : null}
                      {creature.condition_immunities ? (
                        <div className="condition-immunites">
                          <span className="encounter_subtitle">
                            Condition Imm:
                          </span>{" "}
                          {creature.condition_immunities?.map(
                            (condition_immunity_item: any) => {
                              return <span>{condition_immunity_item}, </span>;
                            }
                          )}
                        </div>
                      ) : null}
                      {creature.skills ? (
                        <div className="skills">
                          <span className="encounter_subtitle">Skills:</span>{" "}
                          {creature.skills.map((skillsItem: any) => {
                            return (
                              <span>
                                {skillsItem.name}: +{skillsItem.value},{" "}
                              </span>
                            );
                          })}
                        </div>
                      ) : null}
                      {creature.senses ? (
                        <div className="senses">
                          <span className="encounter_subtitle">Senses:</span>{" "}
                          {creature.senses.map((sensesItem: any) => {
                            return (
                              <span>
                                {sensesItem.passive ? `passive` : null}{" "}
                                {sensesItem.name} {sensesItem.value},{" "}
                              </span>
                            );
                          })}
                        </div>
                      ) : null}
                      <div className="block_footer">
                        <button onClick={() => setSearchResult(creature)}>
                          View
                        </button>
                        <button
                          onClick={() => {
                            const newList = encounterList.filter(
                              (item: any) => item !== encounterList[index]
                            );

                            setEncounterList(newList);
                          }}
                        >
                          Remove
                        </button>
                        <Notes creature={creature} />
                      </div>
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
