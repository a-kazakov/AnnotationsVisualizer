(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _InvalidFormatError = require("exceptions/InvalidFormatError");

var _InvalidFormatError2 = _interopRequireDefault(_InvalidFormatError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AnnotationData = function () {
    //  Public

    function AnnotationData(source_data, parent) {
        _classCallCheck(this, AnnotationData);

        this._valudateInput(source_data, parent);
        this._id = source_data.id;
        this._start_pos = source_data.start_pos;
        this._end_pos = source_data.end_pos;
        this._type = source_data.type;
        this._properties = source_data.properties;
        this._props_types = Object.keys(this._properties);
        this._props_types.sort();
    }

    _createClass(AnnotationData, [{
        key: "getPropertyName",
        value: function getPropertyName(key) {
            return key;
        }
    }, {
        key: "getPropertyValue",
        value: function getPropertyValue(key) {
            if (!(key in this._properties)) {
                return null;
            }
            return this._properties[key];
        }
    }, {
        key: "_valudateInput",


        // Private

        value: function _valudateInput(source_data, parent) {
            var MANDATORY_FILEDS = {
                "id": function id(x) {
                    return typeof x === "string";
                },
                "start_pos": function start_pos(x) {
                    return Number.isInteger(x);
                },
                "end_pos": function end_pos(x) {
                    return Number.isInteger(x);
                },
                "type": function type(x) {
                    return typeof x === "string";
                },
                "properties": function properties(x) {
                    if ((typeof x === "undefined" ? "undefined" : _typeof(x)) !== "object" || Array.isArray(x)) {
                        return false;
                    }
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = Object.keys(x)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var key = _step.value;

                            if (typeof x[key] !== "string") {
                                return false;
                            }
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }

                    return true;
                }
            };
            if ((typeof source_data === "undefined" ? "undefined" : _typeof(source_data)) !== "object" || Array.isArray(source_data)) {
                throw new _InvalidFormatError2.default("All annotations should be objects");
            }
            if ("children" in source_data && !Array.isArray(source_data.children)) {
                throw new _InvalidFormatError2.default("Invalid children propery in annotation with id " + source_data.id);
            }
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = Object.keys(MANDATORY_FILEDS)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var field = _step2.value;

                    if (!(field in source_data)) {
                        throw new _InvalidFormatError2.default("Missing " + field + " field in annotation with id " + source_data.id);
                    }
                    if (!MANDATORY_FILEDS[field](source_data[field])) {
                        throw new _InvalidFormatError2.default("Failed validation for " + field + " field in annotation with id " + source_data.id);
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            if (source_data.start_pos >= source_data.end_pos) {
                throw new _InvalidFormatError2.default("end_pos should be greater than start_pos in annotation with id " + source_data.id);
            }
            if (source_data.start_pos < 0) {
                throw new _InvalidFormatError2.default("end_pos should be >= 0 in annotation with id " + source_data.id);
            }
            if (source_data.end_pos > parent.document_text.length) {
                throw new _InvalidFormatError2.default("Annotation with id " + source_data.id + " exceeds document text length");
            }
        }
    }, {
        key: "id",
        get: function get() {
            return this._id;
        }
    }, {
        key: "start_pos",
        get: function get() {
            return this._start_pos;
        }
    }, {
        key: "end_pos",
        get: function get() {
            return this._end_pos;
        }
    }, {
        key: "type",
        get: function get() {
            return this._type;
        }
    }, {
        key: "props_types",
        get: function get() {
            return this._props_types;
        }
    }]);

    return AnnotationData;
}();

exports.default = AnnotationData;

},{"exceptions/InvalidFormatError":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _InvalidFormatError = require("exceptions/InvalidFormatError");

var _InvalidFormatError2 = _interopRequireDefault(_InvalidFormatError);

var _AnnotationData = require("./AnnotationData");

var _AnnotationData2 = _interopRequireDefault(_AnnotationData);

var _tools = require("common/tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AnnotationsList = function () {
    // Public

    function AnnotationsList(source_data) {
        var _this = this;

        _classCallCheck(this, AnnotationsList);

        this._validateInput(source_data);
        this._document_text = source_data["document_text"];
        this._annotations = source_data["annotations"].map(function (annotation) {
            return new _AnnotationData2.default(annotation, _this);
        });
        this._buildIdIndex();
        this._buildDisjointList();
    }

    _createClass(AnnotationsList, [{
        key: "getById",
        value: function getById(id) {
            if (!this._id_index.has(id)) {
                throw (0, _InvalidFormatError2.default)("Invalid id referenced: " + id);
            }
            return this._id_index.get(id);
        }
    }, {
        key: "_validateInput",


        // Private

        value: function _validateInput(source_data) {
            if (!("document_text" in source_data)) {
                throw new _InvalidFormatError2.default("Missing document_text property on the top level");
            }
            if (!("annotations" in source_data)) {
                throw new _InvalidFormatError2.default("Missing annotations property on the top level");
            }
            if (typeof source_data["document_text"] !== "string") {
                throw new _InvalidFormatError2.default("document_text property on the top level should be of type string");
            }
            if (!Array.isArray(source_data["annotations"])) {
                throw new _InvalidFormatError2.default("annotations property on the top level should be an array");
            }
        }
    }, {
        key: "_buildIdIndex",
        value: function _buildIdIndex() {
            this._id_index = new Map();
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this._annotations[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var annotation = _step.value;

                    var id = annotation.id;
                    if (this._id_index.has(id)) {
                        throw new _InvalidFormatError2.default("Duplicated ID: " + id);
                    }
                    this._id_index.set(id, annotation);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: "_buildDisjointList",
        value: function _buildDisjointList() {
            var points = new Map([[0, []], [this._document_text.length, []]]);

            function addPoint(pos, type, annotation) {
                if (!points.has(pos)) {
                    points.set(pos, []);
                }
                points.get(pos).push({ type: type, annotation: annotation });
            }

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this._annotations[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var annotation = _step2.value;

                    addPoint(annotation.start_pos, "B", annotation);
                    addPoint(annotation.end_pos, "E", annotation);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            var points_values = (0, _tools.iterToArray)(points.keys());
            points_values.sort(function (a, b) {
                return a - b;
            });

            var latest_pos = null;
            var result = [];
            var buffer = new Set();

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = points_values[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var point_value = _step3.value;

                    if (latest_pos !== null) {
                        result.push({
                            text: this._document_text.slice(latest_pos, point_value),
                            annotations: (0, _tools.iterToArray)(buffer)
                        });
                    }
                    var _iteratorNormalCompletion4 = true;
                    var _didIteratorError4 = false;
                    var _iteratorError4 = undefined;

                    try {
                        for (var _iterator4 = points.get(point_value)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                            var point = _step4.value;

                            if (point.type === "B") {
                                buffer.add(point.annotation);
                            } else {
                                buffer.delete(point.annotation);
                            }
                        }
                    } catch (err) {
                        _didIteratorError4 = true;
                        _iteratorError4 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                _iterator4.return();
                            }
                        } finally {
                            if (_didIteratorError4) {
                                throw _iteratorError4;
                            }
                        }
                    }

                    latest_pos = point_value;
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            this._disjoint_list = result;
        }
    }, {
        key: "document_text",
        get: function get() {
            return this._document_text;
        }
    }, {
        key: "annotations",
        get: function get() {
            return this._annotations;
        }
    }, {
        key: "disjoint_annotations",
        get: function get() {
            return this._disjoint_list;
        }
    }]);

    return AnnotationsList;
}();

exports.default = AnnotationsList;

},{"./AnnotationData":1,"common/tools":3,"exceptions/InvalidFormatError":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.iterToArray = iterToArray;
function iterToArray(iterator) {
    var result = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = iterator[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var e = _step.value;

            result.push(e);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return result;
}

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InvalidFormatError = function (_Error) {
    _inherits(InvalidFormatError, _Error);

    function InvalidFormatError(message) {
        _classCallCheck(this, InvalidFormatError);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(InvalidFormatError).call(this, "Invalid format: " + message));
    }

    return InvalidFormatError;
}(Error);

exports.default = InvalidFormatError;

},{}],5:[function(require,module,exports){
"use strict";

var _AnnotationsList = require("classes/AnnotationsList");

var _AnnotationsList2 = _interopRequireDefault(_AnnotationsList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.AnnotationsList = _AnnotationsList2.default;

window.SAMPLE_DATA = {
    "document_text": "Alexander S. Pushkin was born on 26 May 1799.",
    "annotations": [{
        "id": "1",
        "start_pos": 0,
        "end_pos": 20,
        "type": "Entity",
        "properties": {
            "Part": "Noun",
            "Is proper": "Yes"
        }
    }, {
        "id": "2",
        "start_pos": 21,
        "end_pos": 29,
        "type": "Entity",
        "properties": {
            "Part": "Verb",
            "Tense": "Past"
        }
    }, {
        "id": "3",
        "start_pos": 33,
        "end_pos": 44,
        "type": "Date",
        "properties": {
            "Day": "26",
            "Month": "May",
            "Year": "1799"
        }
    }]
};

},{"classes/AnnotationsList":2}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqc3hcXGNsYXNzZXNcXEFubm90YXRpb25zTGlzdFxcQW5ub3RhdGlvbkRhdGEuanN4IiwianN4XFxjbGFzc2VzXFxBbm5vdGF0aW9uc0xpc3RcXGluZGV4LmpzeCIsImpzeFxcY29tbW9uXFx0b29scy5qc3giLCJqc3hcXGV4Y2VwdGlvbnNcXEludmFsaWRGb3JtYXRFcnJvci5qc3giLCJqc3hcXHRlc3QuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7OztJQUdxQixjOzs7QUFHakIsNEJBQVksV0FBWixFQUF5QixNQUF6QixFQUFpQztBQUFBOztBQUM3QixhQUFLLGNBQUwsQ0FBb0IsV0FBcEIsRUFBaUMsTUFBakM7QUFDQSxhQUFLLEdBQUwsR0FBVyxZQUFZLEVBQXZCO0FBQ0EsYUFBSyxVQUFMLEdBQWtCLFlBQVksU0FBOUI7QUFDQSxhQUFLLFFBQUwsR0FBZ0IsWUFBWSxPQUE1QjtBQUNBLGFBQUssS0FBTCxHQUFhLFlBQVksSUFBekI7QUFDQSxhQUFLLFdBQUwsR0FBbUIsWUFBWSxVQUEvQjtBQUNBLGFBQUssWUFBTCxHQUFvQixPQUFPLElBQVAsQ0FBWSxLQUFLLFdBQWpCLENBQXBCO0FBQ0EsYUFBSyxZQUFMLENBQWtCLElBQWxCO0FBQ0g7Ozs7d0NBRWUsRyxFQUFLO0FBQ2pCLG1CQUFPLEdBQVA7QUFDSDs7O3lDQUVnQixHLEVBQUs7QUFDbEIsZ0JBQUksRUFBRSxPQUFPLEtBQUssV0FBZCxDQUFKLEVBQWdDO0FBQzVCLHVCQUFPLElBQVA7QUFDSDtBQUNELG1CQUFPLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFQO0FBQ0g7Ozs7Ozs7dUNBd0JjLFcsRUFBYSxNLEVBQVE7QUFDaEMsZ0JBQU0sbUJBQW1CO0FBQ3JCLHNCQUFNO0FBQUEsMkJBQUssT0FBTyxDQUFQLEtBQWMsUUFBbkI7QUFBQSxpQkFEZTtBQUVyQiw2QkFB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aUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFLbEMsV0FBTyxNQUFQO0FBQ0g7Ozs7Ozs7Ozs7Ozs7OztJQ05vQixrQjs7O0FBQ2pCLGdDQUFZLE9BQVosRUFBcUI7QUFBQTs7QUFBQSxxR0FDWCxxQkFBcUIsT0FEVjtBQUVwQjs7O0VBSDJDLEs7O2tCQUEzQixrQjs7Ozs7QUNBckI7Ozs7OztBQUVBLE9BQU8sZUFBUDs7QUFFQSxPQUFPLFdBQVAsR0FBcUI7QUFDakIscUJBQWlCLCtDQURBO0FBRWpCLG1CQUFlLENBQ1g7QUFDSSxjQUFNLEdBRFY7QUFFSSxxQkFBYSxDQUZqQjtBQUdJLG1CQUFXLEVBSGY7QUFJSSxnQkFBUSxRQUpaO0FBS0ksc0JBQWM7QUFDVixvQkFBUSxNQURFO0FBRVYseUJBQWE7QUFGSDtBQUxsQixLQURXLEVBVVI7QUFDQyxjQUFNLEdBRFA7QUFFQyxxQkFBYSxFQUZkO0FBR0MsbUJBQVcsRUFIWjtBQUlDLGdCQUFRLFFBSlQ7QUFLQyxzQkFBYztBQUNWLG9CQUFRLE1BREU7QUFFVixxQkFBUztBQUZDO0FBTGYsS0FWUSxFQW1CUjtBQUNDLGNBQU0sR0FEUDtBQUVDLHFCQUFhLEVBRmQ7QUFHQyxtQkFBVyxFQUhaO0FBSUMsZ0JBQVEsTUFKVDtBQUtDLHNCQUFjO0FBQ1YsbUJBQU8sSUFERztBQUVWLHFCQUFTLEtBRkM7QUFHVixvQkFBUTtBQUhFO0FBTGYsS0FuQlE7QUFGRSxDQUFyQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgSW52YWxpZEZvcm1hdEVycm9yIGZyb20gXCJleGNlcHRpb25zL0ludmFsaWRGb3JtYXRFcnJvclwiO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFubm90YXRpb25EYXRhIHtcbiAgICAvLyAgUHVibGljXG5cbiAgICBjb25zdHJ1Y3Rvcihzb3VyY2VfZGF0YSwgcGFyZW50KSB7XG4gICAgICAgIHRoaXMuX3ZhbHVkYXRlSW5wdXQoc291cmNlX2RhdGEsIHBhcmVudCk7XG4gICAgICAgIHRoaXMuX2lkID0gc291cmNlX2RhdGEuaWQ7XG4gICAgICAgIHRoaXMuX3N0YXJ0X3BvcyA9IHNvdXJjZV9kYXRhLnN0YXJ0X3BvcztcbiAgICAgICAgdGhpcy5fZW5kX3BvcyA9IHNvdXJjZV9kYXRhLmVuZF9wb3M7XG4gICAgICAgIHRoaXMuX3R5cGUgPSBzb3VyY2VfZGF0YS50eXBlO1xuICAgICAgICB0aGlzLl9wcm9wZXJ0aWVzID0gc291cmNlX2RhdGEucHJvcGVydGllcztcbiAgICAgICAgdGhpcy5fcHJvcHNfdHlwZXMgPSBPYmplY3Qua2V5cyh0aGlzLl9wcm9wZXJ0aWVzKTtcbiAgICAgICAgdGhpcy5fcHJvcHNfdHlwZXMuc29ydCgpO1xuICAgIH1cblxuICAgIGdldFByb3BlcnR5TmFtZShrZXkpIHtcbiAgICAgICAgcmV0dXJuIGtleTtcbiAgICB9XG5cbiAgICBnZXRQcm9wZXJ0eVZhbHVlKGtleSkge1xuICAgICAgICBpZiAoIShrZXkgaW4gdGhpcy5fcHJvcGVydGllcykpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9wZXJ0aWVzW2tleV07XG4gICAgfVxuXG4gICAgZ2V0IGlkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XG4gICAgfVxuXG4gICAgZ2V0IHN0YXJ0X3BvcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXJ0X3BvcztcbiAgICB9XG5cbiAgICBnZXQgZW5kX3BvcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuZF9wb3M7XG4gICAgfVxuXG4gICAgZ2V0IHR5cGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90eXBlO1xuICAgIH1cblxuICAgIGdldCBwcm9wc190eXBlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb3BzX3R5cGVzO1xuICAgIH1cblxuICAgIC8vIFByaXZhdGVcblxuICAgIF92YWx1ZGF0ZUlucHV0KHNvdXJjZV9kYXRhLCBwYXJlbnQpIHtcbiAgICAgICAgY29uc3QgTUFOREFUT1JZX0ZJTEVEUyA9IHtcbiAgICAgICAgICAgIFwiaWRcIjogeCA9PiB0eXBlb2YoeCkgPT09IFwic3RyaW5nXCIsXG4gICAgICAgICAgICBcInN0YXJ0X3Bvc1wiOiB4ID0+IE51bWJlci5pc0ludGVnZXIoeCksXG4gICAgICAgICAgICBcImVuZF9wb3NcIjogeCA9PiBOdW1iZXIuaXNJbnRlZ2VyKHgpLFxuICAgICAgICAgICAgXCJ0eXBlXCI6IHggPT4gdHlwZW9mKHgpID09PSBcInN0cmluZ1wiLFxuICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6IHggPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgeCAhPT0gXCJvYmplY3RcIiB8fCBBcnJheS5pc0FycmF5KHgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yIChsZXQga2V5IG9mIE9iamVjdC5rZXlzKHgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgeFtrZXldICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2Ygc291cmNlX2RhdGEgIT09IFwib2JqZWN0XCIgfHwgQXJyYXkuaXNBcnJheShzb3VyY2VfZGF0YSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkRm9ybWF0RXJyb3IoXCJBbGwgYW5ub3RhdGlvbnMgc2hvdWxkIGJlIG9iamVjdHNcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChcImNoaWxkcmVuXCIgaW4gc291cmNlX2RhdGEpICYmICFBcnJheS5pc0FycmF5KHNvdXJjZV9kYXRhLmNoaWxkcmVuKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRGb3JtYXRFcnJvcihgSW52YWxpZCBjaGlsZHJlbiBwcm9wZXJ5IGluIGFubm90YXRpb24gd2l0aCBpZCAke3NvdXJjZV9kYXRhLmlkfWApO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGZpZWxkIG9mIE9iamVjdC5rZXlzKE1BTkRBVE9SWV9GSUxFRFMpKSB7XG4gICAgICAgICAgICBpZiAoIShmaWVsZCBpbiBzb3VyY2VfZGF0YSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZEZvcm1hdEVycm9yKGBNaXNzaW5nICR7ZmllbGR9IGZpZWxkIGluIGFubm90YXRpb24gd2l0aCBpZCAke3NvdXJjZV9kYXRhLmlkfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFNQU5EQVRPUllfRklMRURTW2ZpZWxkXShzb3VyY2VfZGF0YVtmaWVsZF0pKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRGb3JtYXRFcnJvcihgRmFpbGVkIHZhbGlkYXRpb24gZm9yICR7ZmllbGR9IGZpZWxkIGluIGFubm90YXRpb24gd2l0aCBpZCAke3NvdXJjZV9kYXRhLmlkfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChzb3VyY2VfZGF0YS5zdGFydF9wb3MgPj0gc291cmNlX2RhdGEuZW5kX3Bvcykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRGb3JtYXRFcnJvcihgZW5kX3BvcyBzaG91bGQgYmUgZ3JlYXRlciB0aGFuIHN0YXJ0X3BvcyBpbiBhbm5vdGF0aW9uIHdpdGggaWQgJHtzb3VyY2VfZGF0YS5pZH1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc291cmNlX2RhdGEuc3RhcnRfcG9zIDwgMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRGb3JtYXRFcnJvcihgZW5kX3BvcyBzaG91bGQgYmUgPj0gMCBpbiBhbm5vdGF0aW9uIHdpdGggaWQgJHtzb3VyY2VfZGF0YS5pZH1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc291cmNlX2RhdGEuZW5kX3BvcyA+IHBhcmVudC5kb2N1bWVudF90ZXh0Lmxlbmd0aCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRGb3JtYXRFcnJvcihgQW5ub3RhdGlvbiB3aXRoIGlkICR7c291cmNlX2RhdGEuaWR9IGV4Y2VlZHMgZG9jdW1lbnQgdGV4dCBsZW5ndGhgKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBJbnZhbGlkRm9ybWF0RXJyb3IgZnJvbSBcImV4Y2VwdGlvbnMvSW52YWxpZEZvcm1hdEVycm9yXCI7XG5cbmltcG9ydCBBbm5vdGF0aW9uRGF0YSBmcm9tIFwiLi9Bbm5vdGF0aW9uRGF0YVwiO1xuXG5pbXBvcnQgeyBpdGVyVG9BcnJheSB9IGZyb20gXCJjb21tb24vdG9vbHNcIjtcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbm5vdGF0aW9uc0xpc3Qge1xuICAgIC8vIFB1YmxpY1xuXG4gICAgY29uc3RydWN0b3Ioc291cmNlX2RhdGEpIHtcbiAgICAgICAgdGhpcy5fdmFsaWRhdGVJbnB1dChzb3VyY2VfZGF0YSk7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50X3RleHQgPSBzb3VyY2VfZGF0YVtcImRvY3VtZW50X3RleHRcIl07XG4gICAgICAgIHRoaXMuX2Fubm90YXRpb25zID0gc291cmNlX2RhdGFbXCJhbm5vdGF0aW9uc1wiXS5tYXAoYW5ub3RhdGlvbiA9PiBuZXcgQW5ub3RhdGlvbkRhdGEoYW5ub3RhdGlvbiwgdGhpcykpXG4gICAgICAgIHRoaXMuX2J1aWxkSWRJbmRleCgpO1xuICAgICAgICB0aGlzLl9idWlsZERpc2pvaW50TGlzdCgpO1xuICAgIH1cblxuICAgIGdldEJ5SWQoaWQpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pZF9pbmRleC5oYXMoaWQpKSB7XG4gICAgICAgICAgICB0aHJvdyBJbnZhbGlkRm9ybWF0RXJyb3IoYEludmFsaWQgaWQgcmVmZXJlbmNlZDogJHtpZH1gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5faWRfaW5kZXguZ2V0KGlkKTtcbiAgICB9XG5cbiAgICBnZXQgZG9jdW1lbnRfdGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RvY3VtZW50X3RleHQ7XG4gICAgfVxuXG4gICAgZ2V0IGFubm90YXRpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYW5ub3RhdGlvbnM7XG4gICAgfVxuXG4gICAgZ2V0IGRpc2pvaW50X2Fubm90YXRpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzam9pbnRfbGlzdDtcbiAgICB9XG5cbiAgICAvLyBQcml2YXRlXG5cbiAgICBfdmFsaWRhdGVJbnB1dChzb3VyY2VfZGF0YSkge1xuICAgICAgICBpZiAoIShcImRvY3VtZW50X3RleHRcIiBpbiBzb3VyY2VfZGF0YSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkRm9ybWF0RXJyb3IoXCJNaXNzaW5nIGRvY3VtZW50X3RleHQgcHJvcGVydHkgb24gdGhlIHRvcCBsZXZlbFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIShcImFubm90YXRpb25zXCIgaW4gc291cmNlX2RhdGEpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZEZvcm1hdEVycm9yKFwiTWlzc2luZyBhbm5vdGF0aW9ucyBwcm9wZXJ0eSBvbiB0aGUgdG9wIGxldmVsXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2Ygc291cmNlX2RhdGFbXCJkb2N1bWVudF90ZXh0XCJdICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZEZvcm1hdEVycm9yKFwiZG9jdW1lbnRfdGV4dCBwcm9wZXJ0eSBvbiB0aGUgdG9wIGxldmVsIHNob3VsZCBiZSBvZiB0eXBlIHN0cmluZ1wiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoc291cmNlX2RhdGFbXCJhbm5vdGF0aW9uc1wiXSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkRm9ybWF0RXJyb3IoXCJhbm5vdGF0aW9ucyBwcm9wZXJ0eSBvbiB0aGUgdG9wIGxldmVsIHNob3VsZCBiZSBhbiBhcnJheVwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9idWlsZElkSW5kZXgoKSB7XG4gICAgICAgIHRoaXMuX2lkX2luZGV4ID0gbmV3IE1hcCgpO1xuICAgICAgICBmb3IgKGxldCBhbm5vdGF0aW9uIG9mIHRoaXMuX2Fubm90YXRpb25zKSB7XG4gICAgICAgICAgICBjb25zdCBpZCA9IGFubm90YXRpb24uaWQ7XG4gICAgICAgICAgICBpZiAodGhpcy5faWRfaW5kZXguaGFzKGlkKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkRm9ybWF0RXJyb3IoYER1cGxpY2F0ZWQgSUQ6ICR7aWR9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9pZF9pbmRleC5zZXQoaWQsIGFubm90YXRpb24pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2J1aWxkRGlzam9pbnRMaXN0KCkge1xuICAgICAgICBsZXQgcG9pbnRzID0gbmV3IE1hcChbWzAsIFtdXSwgW3RoaXMuX2RvY3VtZW50X3RleHQubGVuZ3RoLCBbXV1dKTtcblxuICAgICAgICBmdW5jdGlvbiBhZGRQb2ludChwb3MsIHR5cGUsIGFubm90YXRpb24pIHtcbiAgICAgICAgICAgIGlmICghcG9pbnRzLmhhcyhwb3MpKSB7XG4gICAgICAgICAgICAgICAgcG9pbnRzLnNldChwb3MsIFtdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBvaW50cy5nZXQocG9zKS5wdXNoKHsgdHlwZSwgYW5ub3RhdGlvbiB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGFubm90YXRpb24gb2YgdGhpcy5fYW5ub3RhdGlvbnMpIHtcbiAgICAgICAgICAgIGFkZFBvaW50KGFubm90YXRpb24uc3RhcnRfcG9zLCBcIkJcIiwgYW5ub3RhdGlvbik7XG4gICAgICAgICAgICBhZGRQb2ludChhbm5vdGF0aW9uLmVuZF9wb3MsIFwiRVwiLCBhbm5vdGF0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwb2ludHNfdmFsdWVzID0gaXRlclRvQXJyYXkocG9pbnRzLmtleXMoKSk7XG4gICAgICAgIHBvaW50c192YWx1ZXMuc29ydCgoYSwgYikgPT4gYSAtIGIpO1xuXG4gICAgICAgIGxldCBsYXRlc3RfcG9zID0gbnVsbDtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgICAgICBsZXQgYnVmZmVyID0gbmV3IFNldCgpO1xuXG4gICAgICAgIGZvciAobGV0IHBvaW50X3ZhbHVlIG9mIHBvaW50c192YWx1ZXMpIHtcbiAgICAgICAgICAgIGlmIChsYXRlc3RfcG9zICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiB0aGlzLl9kb2N1bWVudF90ZXh0LnNsaWNlKGxhdGVzdF9wb3MsIHBvaW50X3ZhbHVlKSxcbiAgICAgICAgICAgICAgICAgICAgYW5ub3RhdGlvbnM6IGl0ZXJUb0FycmF5KGJ1ZmZlciksXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBwb2ludCBvZiBwb2ludHMuZ2V0KHBvaW50X3ZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGlmIChwb2ludC50eXBlID09PSBcIkJcIikge1xuICAgICAgICAgICAgICAgICAgICBidWZmZXIuYWRkKHBvaW50LmFubm90YXRpb24pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZlci5kZWxldGUocG9pbnQuYW5ub3RhdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGF0ZXN0X3BvcyA9IHBvaW50X3ZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2Rpc2pvaW50X2xpc3QgPSByZXN1bHQ7XG4gICAgfVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGl0ZXJUb0FycmF5KGl0ZXJhdG9yKSB7XG4gICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgIGZvciAobGV0IGUgb2YgaXRlcmF0b3IpIHtcbiAgICAgICAgcmVzdWx0LnB1c2goZSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBJbnZhbGlkRm9ybWF0RXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSkge1xuICAgICAgICBzdXBlcihcIkludmFsaWQgZm9ybWF0OiBcIiArIG1lc3NhZ2UpO1xuICAgIH1cbn1cbiIsImltcG9ydCBBbm5vdGF0aW9uc0xpc3QgZnJvbSBcImNsYXNzZXMvQW5ub3RhdGlvbnNMaXN0XCI7XG5cbndpbmRvdy5Bbm5vdGF0aW9uc0xpc3QgPSBBbm5vdGF0aW9uc0xpc3Q7XG5cbndpbmRvdy5TQU1QTEVfREFUQSA9IHtcbiAgICBcImRvY3VtZW50X3RleHRcIjogXCJBbGV4YW5kZXIgUy4gUHVzaGtpbiB3YXMgYm9ybiBvbiAyNiBNYXkgMTc5OS5cIixcbiAgICBcImFubm90YXRpb25zXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgXCJpZFwiOiBcIjFcIixcbiAgICAgICAgICAgIFwic3RhcnRfcG9zXCI6IDAsXG4gICAgICAgICAgICBcImVuZF9wb3NcIjogMjAsXG4gICAgICAgICAgICBcInR5cGVcIjogXCJFbnRpdHlcIixcbiAgICAgICAgICAgIFwicHJvcGVydGllc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJQYXJ0XCI6IFwiTm91blwiLFxuICAgICAgICAgICAgICAgIFwiSXMgcHJvcGVyXCI6IFwiWWVzXCIsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIFwiaWRcIjogXCIyXCIsXG4gICAgICAgICAgICBcInN0YXJ0X3Bvc1wiOiAyMSxcbiAgICAgICAgICAgIFwiZW5kX3Bvc1wiOiAyOSxcbiAgICAgICAgICAgIFwidHlwZVwiOiBcIkVudGl0eVwiLFxuICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6IHtcbiAgICAgICAgICAgICAgICBcIlBhcnRcIjogXCJWZXJiXCIsXG4gICAgICAgICAgICAgICAgXCJUZW5zZVwiOiBcIlBhc3RcIixcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgXCJpZFwiOiBcIjNcIixcbiAgICAgICAgICAgIFwic3RhcnRfcG9zXCI6IDMzLFxuICAgICAgICAgICAgXCJlbmRfcG9zXCI6IDQ0LFxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiRGF0ZVwiLFxuICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6IHtcbiAgICAgICAgICAgICAgICBcIkRheVwiOiBcIjI2XCIsXG4gICAgICAgICAgICAgICAgXCJNb250aFwiOiBcIk1heVwiLFxuICAgICAgICAgICAgICAgIFwiWWVhclwiOiBcIjE3OTlcIixcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIF1cbn07XG4iXX0=
