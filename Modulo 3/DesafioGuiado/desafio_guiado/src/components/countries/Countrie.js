import React, { Component } from 'react'

export default class Countrie extends Component {
    render() {
        const {currentCountry} = this.props;

        return (
        <div>{currentCountry.name}</div>
        )
    }
}
