import React,  { useEffect, useState } from 'react';
import './App.css';
import Chuckie from './chuckie.jpg';
import axios from 'axios';

function App() {
// creating our state
  const [state, setState] = useState({
    randomResult: '',
    searchKeyword: '',
    searchUrl: 'https://api.chucknorris.io/jokes/search?query='
  })

  useEffect( () => {
    // call the function to load the API for the first
    fetchData();
        }, []);

  const fetchData = async () => {
    const res = await axios.get('https://api.chucknorris.io/jokes/random');
    console.log(res.data.value);
    setState({
      // update you state from before
       ...state,
      randomResult: res.data.value
    });
  }

  const searchWord = (e) => {
    console.log(e.target.value);
    setState({
      ...state,
      searchKeyword: e.target.value
    })
  }

  const fetchResult = async () => {
    const result = await axios.get(state.searchUrl + state.searchKeyword);
    console.log(result.data.result);

    const jokePosition = Math.floor(Math.random()*result.data.result.length + 1);
    console.log( jokePosition );
    setState({
      ...state, 
      randomResult: result.data.result[jokePosition].value
    })
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <h1 className="title">Chuck Norris Api</h1>
          <img src={Chuckie} alt =""/>
        </div>

        <div className="col-6 search">
          <div className="card">
            <div className="card-header">
              Search for keywords
            </div>
            <div className="card-body">
              <input type="text" onChange={searchWord} />
            </div>

            <div>
            <button onClick={fetchResult} className="btn btn-lg">Search Word</button>
          </div>
          </div>         
        </div>

      </div>

      <h2 className="subTitle">Search Results</h2>
      <h4 className="result">{state.randomResult}</h4>
      
    </div>
  );
}

export default App;
