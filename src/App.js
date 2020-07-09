import React from 'react';
import './App.css';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: ''
    };
    //you have to bind the normal function with this to get the App component else its undefined.
    // unlike arrow functions which always have 'this' pointing to App component.
    this.nonReactFunc = this.nonReactFunc.bind(this);
  }

  nonReactFunc() {
    console.log("nonReactFunc")
    console.log(this)
  }

  nonReactArrow = () => {
    console.log("nonReactArrow")
    console.log(this)
  }

  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(monster => monster.name.toLowerCase().includes(searchField.toLowerCase()));
    const searchbox = {
      placeholder: "Search Monsters",
      handleChange: (e) => {
        this.setState({
          searchField: e.target.value
        })
      }
    }

    return (<div className="App">
      <h1>Monsters Rolodex</h1>
      {/* <button onClick={this.nonReactArrow}>Arrow</button> */}
      {/* <button onClick={this.nonReactFunc}>Normal</button> */}
      <SearchBox placeholder={searchbox.placeholder} handleChange={searchbox.handleChange} />
      <CardList monsters={filteredMonsters}></CardList>
    </div>);
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json()).then(users => this.setState({ monsters: users }))
  }
}

export default App;
