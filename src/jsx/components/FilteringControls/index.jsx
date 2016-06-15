import React from "react";

import TypeSelector from "./TypeSelector";
import PropertySelector from "./PropertySelector";
import ValuesFilter from "./ValuesFilter";


export default class FilteringControls extends React.Component {
    render() {
        return (
            <div className="filtering-controls">
                <TypeSelector
                    annotationsFilter={ this.props.annotationsFilter } />
                <PropertySelector
                    annotationsFilter={ this.props.annotationsFilter } />
                <ValuesFilter
                    annotationsFilter={ this.props.annotationsFilter } />
            </div>
        );
    }
}
