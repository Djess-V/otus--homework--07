export interface ILocation {
  [key: string]: unknown;
  longitude: number;
  latitude: number;
}

export async function reqLocation(): Promise<ILocation | undefined> {
  try {
    const responseGeo = await fetch("https://get.geojs.io/v1/ip/geo.json");
    return await responseGeo.json();
  } catch (e) {
    console.log(e);
  }
}
