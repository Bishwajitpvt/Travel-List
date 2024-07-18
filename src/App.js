import React, { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
//   { id: 3, description: "Charger", quantity: 12, packed: false },
// ];

export default function App() {
  // lifting state up to first commom parent
  const [items, setItems] = useState([]);

  //  handle add items in form component
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  // delete items
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  // update items in items list
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats />
    </div>
  );
}

//  logo Component
function Logo() {
  return <h1>🌴 Far Away 🧳</h1>;
}

//  form component
function Form({ onAddItems }) {
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

// packinglist component
function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
    </div>
  );
}

//  display items in the ui as list
function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      ></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.count} {item.desc}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
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
