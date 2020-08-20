export const legs = [
    { name: 'KPYM -> Pt Judith', windHdg: 120, windSpd: 12, trueCourse: 200, magVariance: 14, magCourse: 214, windCrctAngle: 1, groundSpeed: 95, distance: 45, fuelStartTakeoff: 1.1, fuelClimb: 2, fuelCruise: 7 },
    { name: 'Pt Judith -> KBID', windHdg: 130, windSpd: 10, trueCourse: 180, magVariance: 14, magCourse: 194, windCrctAngle: 3, groundSpeed: 98, distance: 13, fuelCruise: .6, fuelExtra: 4 }
]

export const destination = 'Block Island (BID)';

export const origin = 'Plymouth (PYM)';

export const takeoffTimeEst = new Date().setHours(12, 30);

export const frequencies = {
    departureWx: 'PYM 135.625',
    departureCTAF:'PYM 125.75',
    enroute1: 'BOS 124.1',
    enroute2: '',
    destinationWx: 'BID 119.4',
    destinationCTAF: 'BID 123.0',
    other: 'PVD 123.9',
};

export const checkpoints = [
    { description: 'Passing EWB aprt 9pm 2mi. Bogs off right 2-5mi', distPtToPt: 17, distRemaining: 40, timeElapsedEst: 12, timeArrivedEst: '12:42', remarks: 'I dunno'},
    { description: 'Over fall river', distPtToPt: 12, distRemaining: 28, timeElapsedEst: 18, timeArrivedEst: '1:00', remarks: 'I still dunno'}
]
