import nodeGeocoder, { GoogleOptions } from 'node-geocoder';

import config from '../config';

const options: GoogleOptions = {
  provider: 'google',
  apiKey: config.mapsApiKey,
};

const geocoder = nodeGeocoder(options);

export async function getLatLng(address: string) {
  const loc = await geocoder.geocode({
    address,
    country: 'Haiti',
  });

  return {
    lat: loc[0].latitude,
    lng: loc[0].longitude,
  };
}
