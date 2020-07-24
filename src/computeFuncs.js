/**
 * All functions get an input cellVals of this form:
 * [ { headerValue: cellValueToComputeWith}, { ... }, ...]
 *
 * Example for computing "Fly Heading":
 * { magHdg: 280, windCrctAngle: 2 }
 */

/**
 *
 */
export const sum = (mappings) =>
    Object.values(mappings).reduce((accumulator, currentValue) => accumulator + Number.parseInt(currentValue, 10));

/** Requires [ { groundSpeed: <> }, { distance: <> } ]*/
export const flightTime = (mappings) => Math.round(mappings['distance'] / mappings['groundSpeed'] * 60)

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
                // Get the values of the operands we'll use to sum, then sum them
                // ex: header.val = 'magHdg', sumOf = ['magCourse', 'windCrctAngle']
                // rows[0]['magCourse]] = 280, rows[1]['windCrctAngle'] = 2
                // This reduces to a "Fly Heading" of 282.
                let computeVals = {};
                header.computeFrom.forEach(otherHeaderVal => computeVals[otherHeaderVal] = row[otherHeaderVal]);
                const computed = header.computeFunc(computeVals);
                newRows[rowIndex][header.val] = computed;
            }
        }
    }
    return newRows;
};

/**
 * Computes the values of all "total" cells
 * (like total flight time, which is the sum of all the cells in its column)
 */
export const computeTotalCellValues = (headers, rows) => {
    // if we DON'T get a rowNum, that means the cell's value is computed from the column
    let computeVals = {};
    rows.forEach((row, idx) => computeVals[idx] = row[headers[0].val]);
    const valToDisplay = headers[0].computeFunc(computeVals);
}
