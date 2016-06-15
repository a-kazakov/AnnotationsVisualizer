import React from "react";


export default class TypesSelector extends React.Component {
    onChange = (e) => {
        if (e.target.value === "") {
            this.props.annotationsFilter.setType(null);
        } else {
            this.props.annotationsFilter.setType(e.target.value);
        }
    }
    renderOption(key, caption, selected) {
        return (
            <option value={ key }
                    selected={ selected }
                    key={ key }>
                { caption }
            </option>
        );
    }
    render() {
        return (
            <div className="block">
                <label>Filter by type</label>
                <select onChange={ this.onChange }>
                    { this.renderOption("", "< All types >", this.props.annotationsFilter.isTypeSelected()) }
                    { this.props.annotationsFilter.getTypes().map(info =>
                        this.renderOption(info.type, info.type, info.selected)
                    )}
                </select>
            </div>
        );
    }
}
