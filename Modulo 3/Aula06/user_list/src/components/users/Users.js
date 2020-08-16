import React, { Component } from "react";
import User from "./User";

export default class Users extends Component {
  constructor() {
    super();
    this.state = {
      secondsVisible: 0,
    };

    this.interval = null;
  }

  componentDidMount() {
    console.log("Component did mount Users.js");

    this.interval = setInterval(() => {
      const { secondsVisible } = this.state;
      this.setState({
        secondsVisible: secondsVisible + 1,
      });
    }, 1000);
  }

  componentDidUpdate() {
    console.log("Component did update");
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    console.log("component Will unmount");
  }
  render() {
    const { users } = this.props;
    const { secondsVisible } = this.state;

    return (
      <div>
        <p>Componente Users Visivel por {secondsVisible} segundos</p>
        <ul>
          {users.map((user) => {
            return (
              <li>
                <User user={user} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
