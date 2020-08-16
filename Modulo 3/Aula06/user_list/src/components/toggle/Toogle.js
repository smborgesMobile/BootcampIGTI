import React, { Component } from 'react'

export default class Toogle extends Component {
    handleChanges = (event) => {
        const checked = event.target.checked;
        this.props.onToggle(checked)
    }

    render() {
        const {enabled, onToggle} = this.props;

        return (
            <div className="switch">
            <label>
              Mostrar Usuários
              <input type="checkbox" checked={enabled} onChange={this.handleChanges} />
              <span className="lever" />
            </label>
          </div>
        )
    }
}
