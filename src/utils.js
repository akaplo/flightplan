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
