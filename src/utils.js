import {boxKeys} from "./FrequenciesBox";

export const moveItemInArray = (input, from, to) => {
    const toReturn = input;
    toReturn.splice(to, 0, toReturn.splice(from, 1)[0]);
    return toReturn;
};

/**
 *
 * @param lat1 {number}
 * @param lon1 {number}
 * @param lat2 {number}
 * @param lon2 {number}
 * @returns {number}
 */
export const getDistance = (lat1, lon1, lat2, lon2) => {
    if ((lat1 === lat2) && (lon1 === lon2)) {
        return 0;
    } else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        dist = dist * 0.8684 // convert to nautical miles
        return dist;
    }
};

export const reverseCheckpointString = str => {
    let toReturn = str;
    const clockMappings = { 12: 6, 1: 7, 2: 8, 3: 9, 4: 10, 5: 11, 6: 12, 7: 1, 8: 2, 9: 3, 10: 4, 11: 5 };
    const directionMappings = { 'left': 'right', right: 'left' };

    for (const [k, v] of Object.entries(clockMappings)) {
        toReturn = toReturn.replace(`${ k }pm`, `${ v }pm`);
    }
    for (const [k, v] of Object.entries(directionMappings)) {
        toReturn = toReturn.replace(k, v);
    }
    return toReturn
}

export const reverseLegName = str => {
    let oldStart;
    let oldEnd;
    if (str.includes(' -> ')) {
        [oldStart, oldEnd] = str.split(' -> ');
    } else if (str.includes('->')) {
        [oldStart, oldEnd] = str.split('->');
    }
    return `${ oldEnd } -> ${ oldStart }`;
}

export const capHeading = heading => {
    if (heading > 360) {
        return heading - 360;
    } else if (heading <= 0) {
        return 360 + heading;
    }
    return heading;
}

const reverseLeg = leg => {
    let newLeg = { ...leg };
    newLeg.name = reverseLegName(leg.name);
    const trueCourse = capHeading(leg.trueCourse - 180);
    newLeg.trueCourse = trueCourse;
    return newLeg;
}

const reverseLegs = legs => {
    const fuelStartTakeoff = legs[0].fuelStartTakeoff;
    const fuelExtra = legs[legs.length-1].fuelExtra;

    return legs.reverse().map((l, idx) => ({
        ...reverseLeg(l),
        fuelStartTakeoff: idx === 0 ? fuelStartTakeoff : undefined,
        fuelClimb: undefined,
        fuelExtra: idx === legs.length - 1 ? fuelExtra : undefined,
        magCourse: undefined,
        magHdg: undefined
    }));
}

const reverseCheckpoint = checkPoint => {
    return { ...checkPoint, description: reverseCheckpointString(checkPoint.description) };
};

const reverseFrequencies = freqObj => ({
    [boxKeys.DEP_WX]: freqObj[boxKeys.DEST_WX],
    [boxKeys.DEP_GND]: freqObj[boxKeys.DEST_GND],
    [boxKeys.DEP_CTAF]: freqObj[boxKeys.DEST_CTAF],
    [boxKeys.DEST_WX]: freqObj[boxKeys.DEP_WX],
    [boxKeys.DEST_CTAF]: freqObj[boxKeys.DEP_CTAF],
    [boxKeys.DEST_GND]: freqObj[boxKeys.DEP_GND],
    [boxKeys.OTHER]: freqObj[boxKeys.OTHER]
});

export const reverseFlightPlan = (legs, checkpoints, frequencies, origin, destination) => {
    let newCheckpoints = checkpoints;
    let newFrequencies = reverseFrequencies(frequencies);
    let newLegs = reverseLegs(legs);
    newCheckpoints = newCheckpoints.map(reverseCheckpoint);
    const x = {
        legs: newLegs,
        checkpoints: newCheckpoints.reverse(),
        frequencies: newFrequencies,
        origin: destination,
        destination: origin
    };
    return x;
}
