import "./SearchResult.css";

interface SearchResultType {
  searchResult: any;
  modifier: any;
}

export default function SearchResult({
  searchResult,
  modifier,
}: SearchResultType) {
  if (searchResult.name) {
    return (
      <div className="searchResultContainer">
        <div className="name">{searchResult.name}</div>
        <div>Ref: {searchResult.ref}</div>
        <div className="description">
          {searchResult.size} {searchResult.type}, {searchResult.alignment}.
        </div>
        <hr />
        <div className="armorclass">
          <span className="subtitle">AC:</span> {searchResult.armor_class.value}{" "}
          {searchResult.armor_class.armor_type
            ? `(${searchResult.armor_class.armor_type})`
            : null}{" "}
        </div>
        <div className="hitpoints">
          <span className="subtitle">Hit Points:</span>{" "}
          {searchResult.hit_points.value}{" "}
          {searchResult.hit_points.dice
            ? `(${searchResult.hit_points.dice})`
            : null}
        </div>
        <div className="speed">
          {searchResult.speed.map((speedItem: any, index: number) => {
            return (
              <>
                <span className="subtitle">{speedItem.name}: </span>
                <span>
                  {speedItem.distance}ft
                  {speedItem.note ? ` (${speedItem.note})` : null}
                  {index !== searchResult.speed.length - 1 ? ", " : null}
                </span>
              </>
            );
          })}
        </div>
        <hr />
        <span className="subtitle">STR: </span>
        <span>
          {searchResult.strength}{" "}
          {`${
            modifier(searchResult.strength) >= 0
              ? `(+${modifier(searchResult.strength)})`
              : `(${modifier(searchResult.strength)})`
          }`}{" "}
          &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{" "}
        </span>
        <span className="subtitle">DEX: </span>
        <span>
          {searchResult.dexterity}{" "}
          {`${
            modifier(searchResult.dexterity) >= 0
              ? `(+${modifier(searchResult.dexterity)})`
              : `(${modifier(searchResult.dexterity)})`
          }`}{" "}
          &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{" "}
        </span>
        <span className="subtitle">CON: </span>
        <span>
          {searchResult.constitution}{" "}
          {`${
            modifier(searchResult.constitution) >= 0
              ? `(+${modifier(searchResult.constitution)})`
              : `(${modifier(searchResult.constitution)})`
          }`}{" "}
          &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{" "}
        </span>
        <span className="subtitle">INT: </span>
        <span>
          {searchResult.intelligence}{" "}
          {`${
            modifier(searchResult.intelligence) >= 0
              ? `(+${modifier(searchResult.intelligence)})`
              : `(${modifier(searchResult.intelligence)})`
          }`}{" "}
          &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{" "}
        </span>
        <span className="subtitle">WIS: </span>
        <span>
          {searchResult.wisdom}{" "}
          {`${
            modifier(searchResult.wisdom) >= 0
              ? `(+${modifier(searchResult.wisdom)})`
              : `(${modifier(searchResult.wisdom)})`
          }`}{" "}
          &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{" "}
        </span>
        <span className="subtitle">CHA: </span>
        <span>
          {searchResult.charisma}{" "}
          {`${
            modifier(searchResult.charisma) >= 0
              ? `(+${modifier(searchResult.charisma)})`
              : `(${modifier(searchResult.charisma)})`
          }`}{" "}
          &nbsp;&nbsp;
        </span>
        <hr />
        {searchResult.saving_throws ? (
          <div>
            <span className="subtitle">Saving Throws:</span>
            {searchResult.saving_throws?.map((saving_throw_item: any) => {
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
            })}
          </div>
        ) : null}
        {searchResult.damage_vulnerabilties ? (
          <div className="damage-resitances">
            <span className="subtitle">Damage vulnerabilties:</span>{" "}
            {searchResult.damage_vulnerabilties?.map(
              (damage_vulnerabilty_item: any) => {
                return <span>{damage_vulnerabilty_item}, </span>;
              }
            )}
          </div>
        ) : null}
        {searchResult.damage_resistances ? (
          <div className="damage-resitances">
            <span className="subtitle">Damage Resistances:</span>{" "}
            {searchResult.damage_resistances?.map(
              (damage_resistance_item: any) => {
                return <span>{damage_resistance_item}, </span>;
              }
            )}
          </div>
        ) : null}
        {searchResult.damage_immunities ? (
          <div className="damage-immunities">
            <span className="subtitle">Damage Immunities:</span>{" "}
            {searchResult.damage_immunities?.map(
              (damage_immunities_item: any) => {
                return <span>{damage_immunities_item}, </span>;
              }
            )}
          </div>
        ) : null}
        {searchResult.condition_immunities ? (
          <div className="condition-immunites">
            <span className="subtitle">Condition Immunities:</span>{" "}
            {searchResult.condition_immunities?.map(
              (condition_immunity_item: any) => {
                return <span>{condition_immunity_item}, </span>;
              }
            )}
          </div>
        ) : null}
        {searchResult.skills ? (
          <div className="skills">
            <span className="subtitle">Skills:</span>{" "}
            {searchResult.skills.map((skillsItem: any) => {
              return (
                <span>
                  {skillsItem.name}: +{skillsItem.value},{" "}
                </span>
              );
            })}
          </div>
        ) : null}
        {searchResult.senses ? (
          <div className="senses">
            <span className="subtitle">Senses:</span>{" "}
            {searchResult.senses.map((sensesItem: any) => {
              return (
                <span>
                  {sensesItem.passive ? `passive` : null} {sensesItem.name}:{" "}
                  {sensesItem.value},{" "}
                </span>
              );
            })}
          </div>
        ) : null}
        {searchResult.languages ? (
          <div className="languages">
            <span className="subtitle">Languages:</span>{" "}
            {searchResult.languages.map((language_item: any) => {
              return <span>{language_item}, </span>;
            })}
          </div>
        ) : null}
        {searchResult.challenge.value ? (
          <div className="challenge">
            <span className="subtitle">Challenge:</span>{" "}
            {searchResult.challenge.value},{" "}
            {`(${searchResult.challenge.experience})`}xp
          </div>
        ) : null}
        <hr />
        <div className="special-abilties">
          {searchResult.special_abilties.map((special_abilites_item: any) => {
            return (
              <>
                <div>
                  <strong>{special_abilites_item.name}. </strong>
                  <span>{special_abilites_item.desc}</span>
                  {special_abilites_item.list
                    ? special_abilites_item.list.map((list_item: any) => {
                        return (
                          <div className="abiltiy-list-item">{list_item}</div>
                        );
                      })
                    : null}
                </div>
                <br />
              </>
            );
          })}
          <div className="actions">
            {searchResult.actions.length > 0 ? (
              <>
                <span className="action_titles">Actions</span>
                <hr />
                {searchResult.actions.map((action_item: any) => {
                  return (
                    <>
                      <span>
                        <strong>{action_item.name}</strong>
                      </span>
                      <div>
                        <span className="action-type">
                          {action_item.type ? `${action_item.type}: ` : null}
                        </span>
                        <span>
                          {" "}
                          {action_item.hit_bonus
                            ? `${action_item.hit_bonus >= 0 ? "+" : "-"}${
                                action_item.hit_bonus
                              } to hit`
                            : null}
                        </span>
                        <span>
                          {action_item.melee_reach_value
                            ? `, reach ${action_item.melee_reach_value}${action_item.reach_measurement}`
                            : null}
                          {action_item.ranged_reach_value_short
                            ? ` or ${action_item.ranged_reach_value_short}${
                                action_item.ranged_reach_value_long
                                  ? ""
                                  : action_item.reach_measurement
                              }${
                                action_item.ranged_reach_value_long
                                  ? `/${
                                      action_item.ranged_reach_value_long +
                                      action_item.reach_measurement
                                    }`
                                  : null
                              }`
                            : null}
                        </span>
                        <span>
                          {action_item.target_count
                            ? `, ${action_item.target_count} target(s)`
                            : null}
                        </span>
                        <div>
                          {action_item.hit_bonus
                            ? `Hit: ${
                                action_item.damage_value
                                  ? `${action_item.damage_value} ${action_item.damage_type}`
                                  : null
                              }`
                            : null}{" "}
                          <span>
                            {action_item.extra_damage
                              ? action_item.extra_damage.map(
                                  (extra_damage_item: any) => {
                                    return (
                                      <>
                                        {extra_damage_item.description}{" "}
                                        {extra_damage_item.value}{" "}
                                        {extra_damage_item.damage_type} damage
                                      </>
                                    );
                                  }
                                )
                              : null}
                          </span>
                        </div>
                        <span>{action_item.description}</span>
                      </div>
                    </>
                  );
                })}
              </>
            ) : null}
            <div className="legendary-actions">
              {searchResult.legendary_actions ? (
                <>
                  <br />
                  <span className="action_titles">Legendary Actions</span>
                  <hr />
                  <div className="legendary_actions_description">
                    {searchResult.legendary_actions_description}
                  </div>
                  {searchResult.legendary_actions?.map((action_item: any) => {
                    return (
                      <>
                        <span>
                          <strong>{action_item.name}</strong>
                        </span>
                        <div>
                          <span className="action-type">
                            {action_item.type ? `${action_item.type}: ` : null}
                          </span>
                          <span>
                            {" "}
                            {action_item.hit_bonus
                              ? `${action_item.hit_bonus >= 0 ? "+" : "-"}${
                                  action_item.hit_bonus
                                } to hit`
                              : null}
                          </span>
                          <span>
                            {action_item.melee_reach_value
                              ? `, reach ${action_item.melee_reach_value}${action_item.reach_measurement}`
                              : null}
                            {action_item.ranged_reach_value_short
                              ? ` or ${action_item.ranged_reach_value_short}${
                                  action_item.ranged_reach_value_long
                                    ? ""
                                    : action_item.reach_measurement
                                }${
                                  action_item.ranged_reach_value_long
                                    ? `/${
                                        action_item.ranged_reach_value_long +
                                        action_item.reach_measurement
                                      }`
                                    : null
                                }`
                              : null}
                          </span>
                          <span>
                            {action_item.target_count
                              ? `, ${action_item.target_count} target(s)`
                              : null}
                          </span>
                          <div>
                            {action_item.hit_bonus
                              ? `Hit: ${
                                  action_item.damage_value
                                    ? `${action_item.damage_value} ${action_item.damage_type}.`
                                    : null
                                }`
                              : null}
                          </div>
                          <span>
                            {action_item.extra_damage
                              ? action_item.extra_damage.map(
                                  (extra_damage_item: any) => {
                                    return <>{extra_damage_item.description}</>;
                                  }
                                )
                              : null}
                          </span>
                          <span>{action_item.description}</span>
                        </div>
                      </>
                    );
                  })}
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <></>;
}
