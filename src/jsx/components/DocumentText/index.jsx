import React from "react";

import DocumentTextChunk from "./DocumentTextChunk";


export default class DocumentText extends React.Component {
    componentWillReceiveProps() {
        this._filtered_chunks = undefined;
    }
    get filtered_chunks() {
        if (typeof this._filtered_chunks === "undefined") {
            this._filtered_chunks = this.props.annotationsList.disjoint_annotations.map(chunk => ({
                text: chunk.text,
                annotations: chunk.annotations.filter(a => this.props.annotationsFilter.isAnnotationEnabled(a)),
            }));
        }
        return this._filtered_chunks;
    }
    renderChunks() {
        return this.filtered_chunks.map((chunk, idx) =>
            <DocumentTextChunk
                key={ idx }
                annotations={ chunk.annotations }
                annotationsFilter={ this.props.annotationsFilter }
                text={ chunk.text } />
        );
    }
    render() {
        return (
            <div className="document-text">
                { this.renderChunks() }
            </div>
        );
    }
}
