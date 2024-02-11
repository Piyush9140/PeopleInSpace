import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "./App.css";
import noname from '../src/Images/noname.png';
function App() {
  const [peopleInSpace, setPeopleInSpace] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showData, setShowData] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://api.open-notify.org/astros.json");
      const data = await response.json();
      setPeopleInSpace(data.people);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (showData) {
      fetchData();
    }
  }, [showData]);

  useEffect(() => {
    const filtered = peopleInSpace.filter((person) =>
      person.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPeople(filtered);
  }, [searchQuery, peopleInSpace]);

  const toggleShowData = () => {
    setShowData(!showData);
    if (!showData) {
      setSearchQuery("");
    }
  };

  return (
  <div >
    <div className="App">
      <div className="LogoImageContainer container">
      <img className="LogoImage" src={noname} alt="Logo" />
      <h1>InnovateByte</h1>
      </div>
      
      <button className="ButtonUI container" onClick={toggleShowData}>
        {showData ? "Hide Data" : "Show Data"}
      </button>
      {showData && (
        <>
        <div>
          <div className="search-container ">
          <input className=" search-input search-button"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name"
          />
          </div>
          <p className="PeopleCount">Total People: {filteredPeople.length}</p>
          <div className="card-container">
            {isLoading ? (
              <>
                <div className="shimmer-card">
                  <div className="shimmer-line" />
                  <Skeleton height={20} />
                  <Skeleton height={150} />
                </div>
                <div className="shimmer-card">
                  <div className="shimmer-line" />
                  <Skeleton height={20} />
                  <Skeleton height={150} />
                </div>
                <div className="shimmer-card">
                  <div className="shimmer-line" />
                  <Skeleton height={20} />
                  <Skeleton height={150} />
                </div>
                <div className="shimmer-card">
                  <div className="shimmer-line" />
                  <Skeleton height={20} />
                  <Skeleton height={150} />
                </div>
                <div className="shimmer-card">
                  <div className="shimmer-line" />
                  <Skeleton height={20} />
                  <Skeleton height={150} />
                </div>
                <div className="shimmer-card">
                  <div className="shimmer-line" />
                  <Skeleton height={20} />
                  <Skeleton height={150} />
                </div>
                <div className="shimmer-card">
                  <div className="shimmer-line" />
                  <Skeleton height={20} />
                  <Skeleton height={150} />
                </div>
              </>
            ) : (
              filteredPeople.map((person) => (
                <div key={person.name} className="card card-content card-title card-description ">
                  <h3 >{person.name}</h3>
                  <p className="card-description" >Craft: {person.craft}</p>
                </div>
              ))
            )}
          </div>
        </div>
        </>
      )}
    </div>
    
    </div>
  );
}

export default App;
