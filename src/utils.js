import moment from 'moment';
import {boxKeys} from "./FrequenciesBox";
import {lowerBoxHeaders} from "./LowerBox";
import {computeTotalCellValue, sum} from "./computeFuncs";
import {upperBoxHeaders} from "./UpperBox";

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
    if (!str) {
        return;
    }
    let toReturn = str;
    const clockMappings = { 12: 6, 1: 7, 2: 8, 3: 9, 4: 10, 5: 11, 6: 12, 7: 1, 8: 2, 9: 3, 10: 4, 11: 5 };
    const directionMappings = { 'left': 'right', right: 'left' };
    const words = str.split(' ');
    for (const word of words) {
        // if it's direction on a clockface
        if ((word.length === 3 || word.length === 4) && word.endsWith('pm')) {
            // figure out which clock number it is and switch it with its inverse
            for (const [k, v] of Object.entries(clockMappings)) {
                if (word.includes(k)) {
                    toReturn = toReturn.replace(`${ k }pm`, `${ v }pm`);
                    break;
                }
            }
        }
        // replace 'left' with right and vice versa
        for (const [k, v] of Object.entries(directionMappings)) {
            if (word === k) {
                toReturn = toReturn.replace(k, v);
                break;
            }
        }
    }
    return toReturn
}

export const reverseLegName = str => {
    if (!str) {
        return;
    }
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
    newLeg.name = newLeg.name ?? reverseLegName(leg.name);
    newLeg.trueCourse = newLeg.trueCourse ?? capHeading(leg.trueCourse - 180);
    return newLeg;
}

const reverseLegs = legs => {
    const fuelStartTakeoff = legs[0]?.fuelStartTakeoff;
    const fuelExtra = legs[legs.length-1]?.fuelExtra;

    return legs.reverse().map((l, idx) => ({
        ...reverseLeg(l),
        fuelStartTakeoff: idx === 0 ? fuelStartTakeoff : undefined,
        fuelClimb: undefined,
        fuelExtra: idx === legs.length - 1 ? fuelExtra : undefined,
        magCourse: undefined,
        magHdg: undefined
    }));
}

const reverseCheckpoint = (checkPoint, legCount) => {
    return {
        ...checkPoint,
        description: checkPoint.description ?? reverseCheckpointString(checkPoint.description),
        leg: legCount - (checkPoint.leg + 1)
    };
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
    let newFrequencies = reverseFrequencies(frequencies);
    let newLegs = legs.length > 1 ? reverseLegs(legs) : legs;
    const newCheckpoints = checkpoints.length > 1 ? checkpoints.map(c => reverseCheckpoint(c, legs.length)).reverse() : checkpoints;
    return {
        legs: newLegs,
        checkpoints: newCheckpoints,
        frequencies: newFrequencies,
        origin: destination,
        destination: origin
    };
}

export const calculateLowerBoxCellValues = (checkpoints, legs, takeoffTimeEst=Date.now()) => {
    const checkpointsWithCalculatedVals = checkpoints;

    checkpoints.forEach((checkpt, rowIdx) => {
        for (const header of lowerBoxHeaders) {
            if (header.val === 'distRemaining') {
                const totalMiles = computeTotalCellValue(upperBoxHeaders.find(h => h.val === 'distance'), legs);
                const mappings = { totalMiles };
                // Calculate distance remaining for this cell using all previous distances
                for (let i = 0; i <= rowIdx; i++) {
                    mappings[Math.random()] = checkpoints[i]['distPtToPt'] * -1;
                }
                const distRemaining = sum(mappings);
                if (distRemaining >= 0) {
                    checkpointsWithCalculatedVals[rowIdx][header.val] = distRemaining;
                } else if (distRemaining < 0) {
                    checkpointsWithCalculatedVals[rowIdx][header.val] = 'ERROR: < 0'
                } else {
                    checkpointsWithCalculatedVals[rowIdx][header.val] = header.defaultValue;
                }
            }
            if (header.val === 'timeElapsedEst') {
                const speed = legs[checkpt.leg]['groundSpeed'];
                checkpointsWithCalculatedVals[rowIdx][header.val] = Math.round(checkpt['distPtToPt'] / speed * 60);
            }
            if (header.val === 'timeArrivedEst') {
                // For each checkpoint, calculate its estimated arrival time by adding its already-calculated
                // elapsed time to the previous checkpoint's arrival time
                for (let i = 0; i <= rowIdx; i++) {
                    let prevArrivalTime;
                    const elapsedTime = checkpoints[rowIdx]['timeElapsedEst'];
                    if (i === 0) {
                        prevArrivalTime = moment(takeoffTimeEst);
                    } else {
                        prevArrivalTime = moment(checkpointsWithCalculatedVals[i - 1][header.val], 'hh:mm');
                    }
                    const newArrivalTime = prevArrivalTime.add(elapsedTime, 'm');
                    checkpointsWithCalculatedVals[rowIdx][header.val] = newArrivalTime.format('hh:mm');
                }
            }
        }
    });
    return checkpointsWithCalculatedVals;
}
