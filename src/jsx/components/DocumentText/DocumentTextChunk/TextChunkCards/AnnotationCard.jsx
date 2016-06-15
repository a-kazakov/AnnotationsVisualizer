import React from "react";


export default class AnnotationCard extends React.Component {
    renderProperties() {
        const a = this.props.annotation;
        return this.props.annotation.props_types.map(type => {
            return (
                <tr key={ type }>
                    <th>{ a.getPropertyName(type) }</th>
                    <td>{ a.getPropertyValue(type) }</td>
                </tr>
            );
        });
    }

    render() {
        return (
            <div className="annotation-card">
                <div className="type">
                    { this.props.annotation.type }
                </div>
                <div className="properties">
                    <table><tbody>
                        { this.renderProperties() }
                    </tbody></table>
                </div>
            </div>
        );
    }
}
