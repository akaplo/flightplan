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
    Object.values(mappings).reduce((accumulator, currentValue) => accumulator + Number.parseInt(currentValue, 10) || 0);

/** Requires [ { groundSpeed: <> }, { distance: <> } ]*/
export const flightTime = (mappings) => {
    const distance = Number.parseFloat(mappings['distance']) || 0;
    const groundV = Number.parseFloat(mappings['groundSpeed']) || 0;
    return Math.round(distance / groundV * 60) || 0;
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
 * Computes the values of a "total" cell
 * (like total flight time, which is the sum of all the cells in its column)
 */
export const computeTotalCellValue = (header, rows) => {
    let computeVals = {};
    rows.forEach((row, idx) => computeVals[idx] = Number.parseInt(row[header.val], 10) || 0);
    return header.totalComputeFunc(computeVals);
}
