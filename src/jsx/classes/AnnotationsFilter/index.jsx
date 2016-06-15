import { iterToArray } from "common/tools";

import Color from "classes/Color";

import InternalError from "exceptions/InternalError";


export default class AnnotationsFilter {
    constructor(annotations, state_callback=null) {
        this._annotations = annotations;
        this._state_callback = state_callback;
        this._type = null;
        this._property = null;
        this._all_types = this._getAllTypes();
        this._makePropertiesIndex();
        this._makeColorIndex();
    }

    _makePropertiesIndex() {
        let result = new Map();
        for (let annotation of this._annotations) {
            if (!result.has(annotation.type)) {
                result.set(annotation.type, new Map());
            }
            let type_map = result.get(annotation.type);
            for (let prop_type of annotation.props_types) {
                if (!type_map.has(prop_type)) {
                    type_map.set(prop_type, new Set());
                }
                type_map.get(prop_type).add(annotation.getPropertyValue(prop_type));
            }
        }
        for (let type_map of result.values()) {
            for (let prop_type of type_map.keys()) {
                type_map.set(prop_type, iterToArray(type_map.get(prop_type)));
            }
        }
        this._props_index = result;
    }

    _makeColorIndex() {
        if (this._type !== null && this._property === null) {
            return;
        }
        let base = this._type === null
            ? this._all_types
            : this._props_index[this._type][this._property];
        let cnt = 0;
        this._color_index = new Map();
        for (let t of base) {
            this._color_index.set(t, Color.getByIndex(cnt++));
        }
    }

    _callback() {
        if (this._state_callback !== null) {
            this._state_callback();
        }
    }

    _getAllTypes() {
        let result = new Set();
        for (let annotation of this._annotations) {
            result.add(annotation.type);
        }
        result = iterToArray(result);
        result.sort();
        return result;
    }

    setType(type) {
        this._type = type;
        this._property = null;
        delete this.___available_properties; // reset cache
        this._makeColorIndex();
        this._callback();
    }

    get available_properties() {
        if (this._type === null) {
            throw new InternalError("Attempt to get properties with no type being set.");
        }
        if (typeof this.__available_properties === "undefined") {
            let result = this._props_index.get(this._type);
            result.sort((a, b) => {
                if (a === null) {
                    return -1;
                }
                if (b === null) {
                    return 1;
                }
                return a - b;
            });
            this.__properties = result;
        }
        return this.__properties;
    }

    getProperies() {
        return this.available_properties.map(property => ({
            prop: property,
            enabled: !this._disabled_values.has(property),
        }));
    }

    setProperty(prop) {
        this._property = prop;
        this._disabled_values = new Set();
        this._makeColorIndex();
        this._callback();
    }

    isAnnotationEnabled(annotation) {
        if (this._type === null) {
            return true;
        }
        if (annotation.type !== this._type) {
            return false;
        }
        if (this._property === null) {
            return true;
        }
        return !this._disabled_values.has(annotation.getPropertyValue(this._property));
    }

    getAnnotationColor(annotation) {
        if (this._type === null) {
            return this._color_index.get(annotation.type);
        } else if (this._property === null) {
            return new Color.getByIndex(0);
        } else {
            return this._color_index.get(annotation.getPropertyValue(this._property));
        }
    }
}
