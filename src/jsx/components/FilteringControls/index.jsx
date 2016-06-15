import React from "react";

import TypesSelector from "./TypesSelector";


export default class FilteringControls extends React.Component {
    render() {
        return (
            <div className="filtering-controls">
                <div className="controls">
                    <TypesSelector
                        annotationsFilter={ this.props.annotationsFilter } />
                </div>
            </div>
        );
    }
}
