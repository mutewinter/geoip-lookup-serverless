import geoip from 'geoip-lite';
import { createHandler } from "./lib/handler";
import { Response } from './lib/response';

export const handler = createHandler((request) => {

  // If the request is served throuh Cloudflare, they give the country
  // automatically as a header so we can save ourselves a lookup
  const geoHeader = request.getHeader('CF-IPCountry');
  if (geoHeader) {
    return Response.create().body({
      "country": geoHeader,
      "via": "cf"
    });
  }

  const geo = geoip.lookup(request.getSourceIp());
  const country = (geo && geo.country) ? geo.country : '';

  return Response.create().body({
    "country_code": country,
    "via": "lookup"
  });
});
