import React from "react";


export default class AnnotationCard extends React.Component {
    static get defaultProps() {
        return {
            child: false,
        }
    }

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
        const class_name = this.props.child ? "child-annotation-card" : "annotation-card";
        return (
            <div className={ class_name }>
                <div className="type">
                    { this.props.annotation.type }
                </div>
                <div className="properties">
                    <table><tbody>
                        { this.renderProperties() }
                    </tbody></table>
                </div>
                <div className="children">
                    { this.props.annotation.children.map(child =>
                        <AnnotationCard
                            child
                            key={ child.id }
                            annotation={ child } />
                    )}
                </div>
            </div>
        );
    }
}
