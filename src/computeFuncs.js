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
