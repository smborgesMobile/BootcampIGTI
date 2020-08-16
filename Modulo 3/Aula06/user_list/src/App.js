import React, { Component } from "react";
import Users from "./components/users/Users";
import Toogle from "./components/toggle/Toogle";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
      showUsers: false,
    };
  }

  async componentDidMount() {
    //Lugar muito bom para requisicoes.
    const res = await fetch(
      "https://randomuser.me/api/?seed=rush&nat=br&results=10"
    );
    const json = await res.json();

    this.setState({
      users: json.results,
    });

    console.log("Did mount: " + this.state.users);
  }

  handleChange = (isChecked) => {
    this.setState({
      showUsers: isChecked,
    });
  };

  render() {
    const { showUsers, users} = this.state;

    console.log(showUsers);
    return (
      <div>
        <h2>React lifecycle.</h2>
        <Toogle enabled={showUsers} onToggle={this.handleChange}/>
        <hr />
        {showUsers && <Users users={users}/>}
      </div>
    );
  }
}
