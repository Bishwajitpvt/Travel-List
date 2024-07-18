import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onReset,
}) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;

  // sort by input
  if (sortBy === "input") sortedItems = items;

  // sort by description
  if (sortBy === "description")
    sortedItems = items.slice().sort((a, b) => a.desc.localeCompare(b.desc));

  // sort by packing status
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>

      {/* sorting btn */}
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onReset}>Clear List</button>
      </div>
    </div>
  );
}
