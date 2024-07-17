import React, { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 12, packed: false },
];
export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

//  logo Component
function Logo() {
  return <h1>🌴 Far Away 🧳</h1>;
}

//  form component
function Form() {
  // state
  const [desc, setDesc] = useState("");
  const [count, setCount] = useState(1);

  function handleSubmit(event) {
    event.preventDefault();

    if (!desc) return;

    const newItem = { desc, count, packed: false, id: Date.now() };
    console.log(newItem);

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

// packinglist component
function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity}
        {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}

//  function stats
function Stats() {
  return (
    <footer className="stats">
      <em>You have x items on your list, and you already packed X (X%)</em>
    </footer>
  );
}
