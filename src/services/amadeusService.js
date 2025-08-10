import Amadeus from "amadeus";
import "dotenv/config";

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET,
});

// Example get hotels by geocode. Used Los Angeles coordinates and a radius of 25km
// (async () => {
//   try {
//     const res = await amadeus.referenceData.locations.hotels.byGeocode.get({
//       latitude: 34.0522,
//       longitude: -118.2437,
//       radius: 50,
//       radiusUnit: "KM",
//     });
//     console.log("OK:", res.data.length, "hotels", res.data.splice(0, 5));
//   } catch (err) {
//     console.log(err);
//     console.error("Status:", err?.response?.status);
//     console.error("Payload:", err?.response?.data || err.message);
//   }
// })();

// export const getHotelsByGrid = async (latitude, longitude, radius) => {
//   try {
//     const res = await amadeus.referenceData.locations.hotels.byGeocode.get({
//       latitude,
//       longitude,
//       radius,
//       radiusUnit: "KM",
//     });
//     return res.data;
//   } catch (err) {
//     console.error("Error fetching hotels by grid:", err);
//     throw err;
//   }
// };

function kmToLatDeg(km) {
  return km / 110.574; // ~km per degree latitude
}
function kmToLonDeg(km, latDeg) {
  const kmPerDeg = 111.32 * Math.cos((latDeg * Math.PI) / 180);
  return kmPerDeg > 0 ? km / kmPerDeg : 0;
}

export function generateUsaHexCenters({
  radiusKm = 50,
  overlap = 1.0,
  bbox = { minLat: 24, maxLat: 49, minLon: -125, maxLon: -66 }, // lower-48
} = {}) {
  const { minLat, maxLat, minLon, maxLon } = bbox;
  const points = [];

  const sKm = Math.sqrt(3) * radiusKm * overlap; // horizontal spacing (km)
  const vKm = 1.5 * radiusKm * overlap; // vertical step (km)

  const latStep = kmToLatDeg(vKm);

  let row = 0;
  for (let lat = minLat; lat <= maxLat + 1e-9; lat += latStep, row++) {
    const lonStep = kmToLonDeg(sKm, lat);
    if (!Number.isFinite(lonStep) || lonStep <= 0) continue;

    const half = lonStep / 2;
    const offset = row % 2 === 1 ? half : 0;

    const startLon = minLon - (offset ? offset : 0);

    for (let lon = startLon; lon <= maxLon + 1e-9; lon += lonStep) {
      const L = +lat.toFixed(6);
      const G = +(lon + offset).toFixed(6);
      if (G < minLon - 1e-9 || G > maxLon + 1e-9) continue;
      points.push({ lat: L, lon: G });
    }
  }
  return points;
}

(async () => {
  for (const { lat, lon } of generateUsaHexCenters({ radiusKm: 50 })) {
    try {
      const res = await amadeus.referenceData.locations.hotels.byGeocode.get({
        latitude: lat,
        longitude: lon,
        radius: 50,
        radiusUnit: "KM",
      });

      console.log(`Found ${res.data.length} hotels at ${lat}, ${lon}`);
    } catch (err) {
      console.error(`Error fetching hotels at ${lat}, ${lon}:`, err);
    }
  }
})();
