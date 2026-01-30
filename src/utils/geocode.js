const axios = require("axios");

const geocodeLocation = async (location) => {
  const response = await axios.get(
    "https://nominatim.openstreetmap.org/search",
    {
      params: {
        q: `${location}, India`,
        format: "json",
        limit: 1
      },
      headers: {
        "User-Agent": "property-app"
      }
    }
  );

  if (!response.data.length) {
    throw new Error("Location not found");
  }

  return {
    latitude: Number(response.data[0].lat),
    longitude: Number(response.data[0].lon)
  };
};

module.exports = geocodeLocation;
