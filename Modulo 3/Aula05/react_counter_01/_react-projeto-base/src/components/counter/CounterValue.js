import React, { Component } from 'react'
import css from "./counter.module.css"

export default class CounterValue extends Component {
    render() {
        return (
            <span className={css.counterValue}>{this.props.value}</span>
        )
    }
}
