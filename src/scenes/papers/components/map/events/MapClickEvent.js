/* encoding: utf-8 */

import PaperInfoCtl from "../../../controllers/paperscape/PaperInfo";
import PaperPositionCtl from "../../../controllers/paperscape/PaperPosition";
import { useMapEvent } from "react-leaflet";

export default function setClickHandler({ viewToWorld, updateSelected }) {
    /**
     * Function setting the map handler for the click event.
     * This function must be called within a React render() context.
     */

    useMapEvent("click", e =>
        checkMapClick(e)
            .then(event => viewToWorld(event.latlng.lng, event.latlng.lat))
            .then(coords => clickToPaper(coords))
            .then(paper => updateSelected(paper.pos, paper.info))
            .catch(err => console.log(err.message))
    );

    return null;
}

async function checkMapClick(event) {
    let clickedClass = event.originalEvent.target.className;
    let isDivStrings = typeof clickedClass === "string";
    let isDivLeaflet = clickedClass.includes("leaflet");

    if (isDivStrings && isDivLeaflet === false) {
        throw new Error("Clicked outside");
    } else {
        return event;
    }
}

async function clickToPaper(coords) {
    let paperPos = await PaperPositionCtl.fetchPaperPos(coords[0], coords[1]);
    if (paperPos === null) {
        throw new Error("Unknown paper coordinates");
    }

    let paperInfo = await PaperInfoCtl.fetchPaperInfo(paperPos.id);
    if (paperInfo === null) {
        throw new Error("Unknown paper ID");
    }

    return { pos: paperPos, info: paperInfo };
}
