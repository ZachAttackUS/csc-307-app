
import Table from "./Table";
import Form from "./Form";
import React, {useState, useEffect} from 'react';

function MyApp() {

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
  }, [] );

  const [characters, setCharacters] = useState([]);

  // function removeOneCharacter(index) {

  //   const updated = characters.filter((character, i) => {
  //     return i !== index;
  //   });
  //   setCharacters(updated);
  // }

  function removeOneCharacter(index) {
    const character = characters[index];
  
    if (character && character.id) {
      const url = `http://localhost:8000/users/${character.id}`;
      fetch(url, { method: 'DELETE' })
        .then((response) => {
          if (response.status == 204) {
            const updated = characters.filter((character, i) => i !== index);
            setCharacters(updated); 
          } else if (response.status == 404) {
            console.error('Failed to delete the character with response:', response);
          }
        })
        .catch((error) => console.error('Failed to delete the character:', error));
    }
  }
  
  // function updateList(person) { 
  //   postUser(person)
  //     .then(() => setCharacters([...characters, response body json]))
  //     .catch((error) => {
  //       console.log(error);
  //     })
  // }
  function updateList(person){
    postUser(person)
    .then((res) => res.status === 201 ? res.json() : undefined)
    .then((json) => {setCharacters([...characters, json])})
    .catch((error) => {
      console.log(error);
    })
  }
    
  
    

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

}



export default MyApp;