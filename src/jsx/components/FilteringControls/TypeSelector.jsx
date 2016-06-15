import React from "react";


export default class TypeSelector extends React.Component {
    onChange = (e) => {
        if (e.target.value === "") {
            this.props.annotationsFilter.setType(null);
        } else {
            this.props.annotationsFilter.setType(e.target.value);
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
        return (
            <div className="block">
                <label>Filter by type</label>
                <select onChange={ this.onChange } value={ this.props.annotationsFilter.getSelectedType() || "" }>
                    { this.renderOption("", "< All types >") }
                    { this.props.annotationsFilter.available_types.map(type =>
                        this.renderOption(type)
                    )}
                </select>
            </div>
        );
    }
}
