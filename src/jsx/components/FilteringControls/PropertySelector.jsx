import React from "react";


export default class PropertySelector extends React.Component {
    onChange = (e) => {
        if (e.target.value === "") {
            this.props.annotationsFilter.setProperty(null);
        } else {
            this.props.annotationsFilter.setProperty(e.target.value);
        }
    }
    renderOption(key, caption=null) {
        if (caption === null) {
            caption = key;
        }
        return (
            <option value={ key }
                    key={ key }>
                { caption }
            </option>
        );
    }
    render() {
        if (this.props.annotationsFilter.getSelectedType() === null) {
            return null;
        }
        return (
            <div className="block">
                <header>Group annotations</header>
                <select onChange={ this.onChange } value={ this.props.annotationsFilter.getSelectedProperty() || "" }>
                    { this.renderOption("", "< No groupping >") }
                    { this.props.annotationsFilter.available_properties.map(prop =>
                        this.renderOption(prop)
                    )}
                </select>
            </div>
        );
    }
}
