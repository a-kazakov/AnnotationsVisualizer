import React from "react";
import ReactDOM from "react-dom";

import TextChunkCards from "./TextChunkCards";

import Color from "classes/Color";

export default class DocumentTextChunk extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hovered: false,
        };
    }

    onMouseEnter = () => {
        this.setState({
            hovered: true,
        });
    }

    onMouseOut = () => {
        this.setState({
            hovered: false,
        });
    }

    renderCards() {
        if (this.props.hasPinned) {
            if (!this.props.pinned) {
                return null;
            }
        } else {
            if (!this.state.hovered) {
                return null;
            }
        }
        return (
            <TextChunkCards
                annotations={ this.props.annotations } />
        );
    }

    getColor() {
        if (this.props.annotations.length === 0) {
            return "transparent";
        }
        return Color.mix(this.props.annotations.map(a => this.props.annotationsFilter.getAnnotationColor(a))).asString(0.3);
    }

    render() {
        return (
            <span className="text-chunk" style={{ background: this.getColor() }} onMouseEnter={ this.onMouseEnter } onMouseLeave={ this.onMouseOut }>
                { this.props.text }
                { this.renderCards() }
            </span>
        );
    }
}
