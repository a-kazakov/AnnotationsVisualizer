import React from "react";

import AnnotationsFilter from "classes/AnnotationsFilter";

import LoaderForm from "./LoaderForm";
import FilteringControls from "./FilteringControls";
import DocumentText from "./DocumentText";


export default class RootComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            annotationsList: null,
            annotationsFilter: null,
        };
    }
    onLoad = (annotations_list) => {
        const annotations_filter = new AnnotationsFilter(annotations_list.annotations, this.onFilteringChanged);
        this.setState({
            annotationsList: annotations_list,
            annotationsFilter: annotations_filter,
        });
    }
    onFilteringChanged = () => {
        this.forceUpdate();
    }
    render() {
        if (this.state.annotationsList === null) {
            return (
                <div className="content">
                    <LoaderForm
                        onDone={ this.onLoad } />
                </div>
            )
        }
        return (
            <div className="content">
                <FilteringControls
                    annotationsFilter={ this.state.annotationsFilter } />
                <DocumentText
                    annotationsList={ this.state.annotationsList }
                    annotationsFilter={ this.state.annotationsFilter } />
            </div>
        )
    }
}
