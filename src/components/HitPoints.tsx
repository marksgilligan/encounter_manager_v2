import "./HitPoints.css";
import { useState } from "react";

interface HitPointsType {
  creature: any;
}

export default function HitPoints({ creature }: HitPointsType) {
  const [hitPoints, setHitPoints] = useState(creature.hit_points.value);

  return (
    <>
      <div className="encounter_title">
        <button
          onClick={() => (
            setHitPoints(hitPoints - 1), creature.hit_points.value--
          )}
        >
          -
        </button>
        {creature.hit_points.value}
        <button
          onClick={() => (
            setHitPoints(hitPoints + 1), creature.hit_points.value++
          )}
        >
          +
        </button>
      </div>
    </>
  );
}
