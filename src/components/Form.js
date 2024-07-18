import { useState } from "react";

export default function Form({ onAddItems }) {
  // state
  const [desc, setDesc] = useState("");
  const [count, setCount] = useState(1);

  function handleSubmit(event) {
    event.preventDefault();

    if (!desc) return;

    const newItem = { desc, count, packed: false, id: Date.now() };
    // console.log(newItem);

    // calling Add items function
    onAddItems(newItem);

    // once submitted
    setDesc("");
    setCount(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?🧳</h3>
      <select onChange={(e) => setCount(Number(e.target.value))}>
        {/* create a array of 20 items and displaying  items*/}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item.."
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
