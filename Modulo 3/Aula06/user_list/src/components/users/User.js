import React, { Component } from "react";
import css from "./user.module.css"

export default class User extends Component {
  render() {
    const { login, name, picture } = this.props.user;
    return (
      <div className={css.flexRow}>
        <img className={css.avatar} alt={name.first} src={picture.large} />
        <span>{name.first}</span>
      </div>
    );
  }
}
