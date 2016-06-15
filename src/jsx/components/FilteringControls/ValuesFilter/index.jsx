import React from "react";

import Item from "./Item";


export default class ValuesFilter extends React.Component {
    render() {
        if (this.props.annotationsFilter.getSelectedProperty() === null) {
            return null;
        }
        return (
            <div className="block">
                <header>{ `Filter by "${this.props.annotationsFilter.getSelectedProperty()}"` }</header>
                { this.props.annotationsFilter.getFilteringValues().map(info =>
                    <Item
                        key={ info.value }
                        value={ info.value }
                        enabled={ info.enabled }
                        annotationsFilter={ this.props.annotationsFilter } />
                ) }
            </div>
        );
    }
}