import React from "react"
import { render } from "react-dom";

import RootComponent from "components/root";

window.addEventListener("load", () =>
    render(
        <RootComponent />,
        document.getElementById("root")
    )
);
