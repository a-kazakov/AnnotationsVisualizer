import InvalidFormatError from "exceptions/InvalidFormatError";


export default class AnnotationData {
    //  Public

    constructor(source_data, annotations_list, parent=null) {
        this._valudateInput(source_data, annotations_list, parent);
        this._parent = parent;
        this._id = source_data.id;
        this._start_pos = source_data.start_pos;
        this._end_pos = source_data.end_pos;
        this._type = source_data.type;
        this._properties = source_data.properties;
        this._props_types = Object.keys(this._properties);
        this._props_types.sort();
        this._children = Array.isArray(source_data.children)
            ? source_data.children.map(child => new AnnotationData(child, annotations_list, this))
            : [];
    }

    getPropertyName(key) {
        return key;
    }

    getPropertyValue(key) {
        if (!(key in this._properties)) {
            return null;
        }
        return this._properties[key];
    }

    get id() {
        return this._id;
    }

    get start_pos() {
        return this._start_pos;
    }

    get end_pos() {
        return this._end_pos;
    }

    get type() {
        return this._type;
    }

    get props_types() {
        return this._props_types;
    }

    get parent() {
        return this._parent;
    }

    get top_parent() {
        if (typeof this.__top_parent === "undefined") {
            let result = this;
            while (result.parent !== null) {
                result = result.parent;
            }
            this.__top_parent = result;
        }
        return this.__top_parent;
    }

    get children() {
        return this._children;
    }

    // Private

    _valudateInput(source_data, annotations_list, parent) {
        const FILEDS_VALIDATORS = {
            "id": x => typeof x === "string",
            "start_pos": x => Number.isInteger(x),
            "end_pos": x => Number.isInteger(x),
            "type": x => typeof x === "string",
            "properties": x => {
                if (typeof x !== "object" || Array.isArray(x)) {
                    return false;
                }
                for (let key of Object.keys(x)) {
                    if (typeof x[key] !== "string") {
                        return false;
                    }
                }
                return true;
            },
        }
        const TOP_LEVEL_FIELDS = ["id", "start_pos", "end_pos", "type", "properties"];
        const CHILDREN_FIELDS = ["id", "properties"]
        if (typeof source_data !== "object" || Array.isArray(source_data)) {
            throw new InvalidFormatError("All annotations should be objects");
        }
        if (("children" in source_data) && !Array.isArray(source_data.children)) {
            throw new InvalidFormatError(`Invalid children propery in annotation with id ${source_data.id}`);
        }
        const required_fields = parent === null ? TOP_LEVEL_FIELDS : CHILDREN_FIELDS;
        for (let field of required_fields) {
            if (!(field in source_data)) {
                throw new InvalidFormatError(`Missing ${field} field in annotation with id ${source_data.id}`);
            }
            if (!FILEDS_VALIDATORS[field](source_data[field])) {
                throw new InvalidFormatError(`Failed validation for ${field} field in annotation with id ${source_data.id}`);
            }
        }
        if (parent === null) {
            if (source_data.start_pos >= source_data.end_pos) {
                throw new InvalidFormatError(`end_pos should be greater than start_pos in annotation with id ${source_data.id}`);
            }
            if (source_data.start_pos < 0) {
                throw new InvalidFormatError(`end_pos should be >= 0 in annotation with id ${source_data.id}`);
            }
            if (source_data.end_pos > annotations_list.document_text.length) {
                throw new InvalidFormatError(`Annotation with id ${source_data.id} exceeds document text length`);
            }
        }
    }
}
