import InvalidFormatError from "exceptions/InvalidFormatError";

import AnnotationData from "./AnnotationData";

import { iterToArray } from "common/tools";


export default class AnnotationsList {
    // Public

    constructor(source_data) {
        this._validateInput(source_data);
        this._document_text = source_data["document_text"];
        this._annotations = source_data["annotations"].map(annotation => new AnnotationData(annotation, this))
        this._buildIdIndex();
        this._buildDisjointList();
    }

    getById(id) {
        if (!this._id_index.has(id)) {
            throw InvalidFormatError(`Invalid id referenced: ${id}`);
        }
        return this._id_index.get(id);
    }

    get document_text() {
        return this._document_text;
    }

    get annotations() {
        return this._annotations;
    }

    get disjoint_annotations() {
        return this._disjoint_list;
    }

    // Private

    _validateInput(source_data) {
        if (!("document_text" in source_data)) {
            throw new InvalidFormatError("Missing document_text property on the top level");
        }
        if (!("annotations" in source_data)) {
            throw new InvalidFormatError("Missing annotations property on the top level");
        }
        if (typeof source_data["document_text"] !== "string") {
            throw new InvalidFormatError("document_text property on the top level should be of type string");
        }
        if (!Array.isArray(source_data["annotations"])) {
            throw new InvalidFormatError("annotations property on the top level should be an array");
        }
    }

    _addAnnotationToIdIndex(annotation) {
        const id = annotation.id;
        if (this._id_index.has(id)) {
            throw new InvalidFormatError(`Duplicated ID: ${id}`);
        }
        this._id_index.set(id, annotation);
        for (let child of annotation.children) {
            this._addAnnotationToIdIndex(child);
        }
    }

    _buildIdIndex() {
        this._id_index = new Map();
        for (let annotation of this._annotations) {
            this._addAnnotationToIdIndex(annotation);
        }
    }

    _buildDisjointList() {
        let points = new Map([[0, []], [this._document_text.length, []]]);

        function addPoint(pos, type, annotation) {
            if (!points.has(pos)) {
                points.set(pos, []);
            }
            points.get(pos).push({ type, annotation });
        }

        for (let annotation of this._annotations) {
            addPoint(annotation.start_pos, "B", annotation);
            addPoint(annotation.end_pos, "E", annotation);
        }

        let points_values = iterToArray(points.keys());
        points_values.sort((a, b) => a - b);

        let latest_pos = null;
        let result = [];
        let buffer = new Set();

        for (let point_value of points_values) {
            if (latest_pos !== null) {
                result.push({
                    text: this._document_text.slice(latest_pos, point_value),
                    annotations: iterToArray(buffer),
                });
            }
            for (let point of points.get(point_value)) {
                if (point.type === "B") {
                    buffer.add(point.annotation);
                } else {
                    buffer.delete(point.annotation);
                }
            }
            latest_pos = point_value;
        }
        this._disjoint_list = result;
    }
}
