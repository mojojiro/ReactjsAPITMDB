import React, { Component } from 'react';
import './App.css';
import Axios from 'axios';
import MovieItem from './MovieItem';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {rows: []}
  }

  componentDidMount(){
    this.tranding();
  }

  tranding = ()=>{
    var dataArray = [];
    var url = "https://api.themoviedb.org/3/trending/all/day?api_key=06a41efa349c757edfb8cf60d0b10086";
    Axios.get(url).then(result=>{
      //console.log(JSON.stringify(result.data.results));
      result.data.results.forEach(item => {
        item.poster_src = "https://image.tmdb.org/t/p/w185" + item.poster_path;
        dataArray.push(item);
      });

      this.setState({rows: dataArray})
    })  
  }

  search = (keyword)=>{ 
    //console.log(keyword);
    var dataArray = [];
    var url = "https://api.themoviedb.org/3/search/movie?api_key=06a41efa349c757edfb8cf60d0b10086&query="+keyword;
    Axios.get(url).then(result=>{
      //console.log(JSON.stringify(result.data.results));
      result.data.results.forEach(item => {
        item.poster_src = "https://image.tmdb.org/t/p/w185" + item.poster_path;
        dataArray.push(item);
      });

      this.setState({rows: dataArray})
    })
  }

  render() {
    return (
      <div className="App">
        {/* JSX (Javascript + XML) */}
        <table style={{backgroundColor: '#333',color:'white',display:'block'}}>
          <tbody>
            <tr>
              <td>
                <img src={require('./assets/logo.jpg')} width="50" />
              </td>
              <td>
                Jo Jo Movie DB
              </td>
            </tr>
          </tbody>
        </table>
      
        <input style={{fontSize:24, display: 'block', width: '100%', paddingLeft: 8}} 
          placeholder="Enter movie name"
          onChange={(event)=> { this.search(event.target.value) }}
        />

        { this.state.rows.map(item=>(
          <MovieItem movie={item} />
        ))}
      </div>
    );
  }
}

export default App;
