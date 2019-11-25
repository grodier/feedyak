import React, { useEffect, useState } from 'react';

function GreetingPhrase(name) {
  return name ? `Hello, ${name}!` : `Hello, World!`;
}

async function postComment(data) {
  return await fetch('/api/testPost', {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function Home() {
  const [name, setName] = useState();
  const [inputVal, setInputVal] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/testFunction', {
        method: 'GET',
      });
      const json = await response.json();
      console.log(json);
      setName(json.name);
    };
    fetchData();
  }, []);

  async function handleSubmit(event) {
    alert('A name was submitted: ' + inputVal);
    event.preventDefault();
    const response = await postComment(inputVal);
    const json = await response.json();
    setName(json.name);
  }

  function handleChange(event) {
    setInputVal(event.target.value);
  }

  return (
    <>
      {GreetingPhrase(name)}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={inputVal} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}

export default Home;
