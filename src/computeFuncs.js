/**
 * All functions get an input cellVals of this form:
 * [ { headerValue: cellValueToComputeWith}, { ... }, ...]
 *
 * Example for computing "Fly Heading":
 * { magHdg: 280, windCrctAngle: 2 }
 */

import { capHeading, getDistance} from "./utils";

/**
 *
 */
export const sum = (mappings) =>
    Math.round(Object
        .values(mappings)
        .filter(val => val !== undefined && val !== null)
        .reduce((accumulator, currentValue) => {
            const curVal = Number.parseFloat(currentValue, 10) || 0;
            const prevVal = Number.parseFloat(accumulator) || 0;
            return prevVal + curVal;
        }) * 10) / 10;

/** Requires [ { groundSpeed: <> }, { distance: <> } ]*/
export const flightTime = (mappings) => {
    const distance = Number.parseFloat(mappings['distance']) || 0;
    const groundV = Number.parseFloat(mappings['groundSpeed']) || 0;
    return Math.round(distance / groundV * 60) || 0;
}

export const distance = (mappings) => {
    const [startOfLeg, endOfLeg] = mappings['latlng'].split(':');
    const [startLat, startLon] = startOfLeg.split(',');
    const [endLat, endLong] = endOfLeg.split(',');

    return Math.round(getDistance(
        Number.parseFloat(startLat),
        Number.parseFloat(startLon),
        Number.parseFloat(endLat),
        Number.parseFloat(endLong)
    ));
}

/**
 * Computes the values of all cells in rows that rely on the values of other columns
 * @param headers
 * @param rows
 */
export const computeRowCellValues = (headers, rows) => {
    let newRows = rows;
    for (let headerIndex = 0; headerIndex < headers.length; headerIndex++) {
        const header = headers[headerIndex];
        if (header.isComputed) {
            for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
                const row = rows[rowIndex];
                // Get the values of the operands we'll use to sum, then compute them
                // ex: header.val = 'magHdg', computeFrom = ['magCourse', 'windCrctAngle']
                // rows[0]['magCourse]] = 280, rows[1]['windCrctAngle'] = 2
                // This reduces to a "Fly Heading" of 282.
                let computeVals = {};
                const getValsForHeaders = otherHeaderVal => computeVals[otherHeaderVal] = row[otherHeaderVal];
                // If we should compute this cell from another cell's underlying (not displayed) value, attempt
                // to do so.
                if (header.computeFromUnderlying !== undefined) {
                    header.computeFromUnderlying.forEach(getValsForHeaders);
                    // If the other cell does not have any underlying values populated, just return displayed value.
                    if (Object.values(computeVals).filter(v => v !== null && v !== undefined && v !== '').length === 0) {
                        continue;
                    }
                } else {
                    header.computeFrom.forEach(getValsForHeaders);
                }
                const computed = Object.values(computeVals).filter(v => !!v).length > 0 ?
                    header.computeFunc(computeVals) : '';
                newRows[rowIndex][header.val] = computed;
            }
        }
    }
    return newRows;
};

/**
 * Computes the values of a "total" cell
 * (like total flight time, which is the sum of all the cells in its column)
 */
export const computeTotalCellValue = (header, rows) => {
    let computeVals = {};
    rows.forEach((row, idx) => computeVals[idx] = Number.parseFloat(row[header.val]) || 0);
    return header.totalComputeFunc(computeVals);
}
