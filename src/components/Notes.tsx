import { useState } from "react";

interface NotesType {
  creature: any;
}

export default function Notes({ creature }: NotesType) {
  const [notes, setNotes] = useState(creature.notes);

  return (
    <>
      <input
        value={creature.notes}
        onChange={(e) => (
          setNotes(e.target.value), (creature.notes = e.target.value)
        )}
        placeholder="notes"
      />
    </>
  );
}
