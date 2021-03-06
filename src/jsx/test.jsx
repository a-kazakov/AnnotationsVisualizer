import AnnotationsList from "classes/AnnotationsList";

window.AnnotationsList = AnnotationsList;

window.SAMPLE_DATA = {
    "document_text": "Alexander S. Pushkin was born on 26 May 1799.",
    "annotations": [
        {
            "id": "1",
            "start_pos": 0,
            "end_pos": 20,
            "type": "Entity",
            "properties": {
                "Part": "Noun",
                "Is proper": "Yes",
            }
        }, {
            "id": "2",
            "start_pos": 21,
            "end_pos": 29,
            "type": "Entity",
            "properties": {
                "Part": "Verb",
                "Tense": "Past",
            }
        }, {
            "id": "3",
            "start_pos": 33,
            "end_pos": 44,
            "type": "Date",
            "properties": {
                "Day": "26",
                "Month": "May",
                "Year": "1799",
            }
        }
    ]
};
