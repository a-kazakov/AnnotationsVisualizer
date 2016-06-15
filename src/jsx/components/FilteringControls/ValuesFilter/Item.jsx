import React from "react";


export default class Item extends React.Component {
    onChange = (e) => {
        if (e.target.checked) {
            this.props.annotationsFilter.enableValue(this.props.value);
        } else {
            this.props.annotationsFilter.disableValue(this.props.value);
        }
    }
    render() {
        return (
            <label>
                <input
                    type="checkbox"
                    checked={ this.props.enabled }
                    onChange={ this.onChange } />
                { this.props.value === null ? <i>No value</i> : this.props.value }
            </label>
        );
    }
}
