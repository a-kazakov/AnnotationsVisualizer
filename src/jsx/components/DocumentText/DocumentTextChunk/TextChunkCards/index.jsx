import React from "react";

import AnnotationCard from "./AnnotationCard";


export default class TextChunkCards extends React.Component {
    renderBody() {
        return this.props.annotations.map(annotation =>
            <AnnotationCard
                key={ annotation.id }
                annotation={ annotation } />
        );
    }

    render() {
        if (this.props.annotations.length === 0) {
            return null;
        }
        return (
            <div className="cards" style={{ left: `-${ 100 * this.props.annotations.length }px` }}>
                { this.renderBody() }
            </div>
        );
    }
}
