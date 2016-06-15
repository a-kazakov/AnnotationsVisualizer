import React from "react";

import AnnotationsList from "classes/AnnotationsList";


export default class LoaderForm extends React.Component {
    onChange = (e) => {
        if (e.target.files.length === 0) {
            return;
        }
        let reader = new FileReader();
        reader.onload = f => {
            try {
                const text = f.target.result;
                const data = JSON.parse(text);
                this.props.onDone(new AnnotationsList(data));
            } catch (e) {
                alert(e.message);
            }
        };
        reader.readAsText(e.target.files[0]);
    }
    render() {
        return (
            <div className="loader-form">
                <input type="file" onChange={ this.onChange } />
            </div>
        );
    }
}
