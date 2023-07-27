 import React, { useState, useEffect } from "react";
 import './App.css';

const App = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://randomuser.me/api/?results=7');
      const data = await response.json();
      setPeople(data.results);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const renderChatItems = () => {
    return people.map((person) => (
      <li key={person.email} className="chat--item">
        <img src={person.picture.thumbnail} alt={person.name.first} />
        <span>{person.name.first} {person.name.last}</span>
      </li>
    ));
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredPeople = people.filter(
      (person) =>
        person.name.first.toLowerCase().includes(searchTerm) ||
        person.name.last.toLowerCase().includes(searchTerm)
    );
    setPeople(filteredPeople);
  };

  return (
    <div className="iphone-x">
      <i>Speaker</i>
      <b>Camera</b>
      <div className="chat--list-wrapper">
        <div className="header-message">
          <div className="headerdata">
            <h1>Messages</h1>
          </div>
          <div className="searchbar">
            <input
              type="text"
              className="chat--search"
              placeholder="Search People"
              onChange={handleSearch}
            />
          </div>
        </div>
        <ul className="chat--list">
          {renderChatItems()}
        </ul>
        {people.length === 0 && <p className="message--no-data">No people found</p>}
      </div>
    </div>
  );
};

export default App;
