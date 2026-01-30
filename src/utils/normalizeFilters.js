const PROPERTY_TYPE_MAP = {
  apartment: "Apartment",
  flat: "Flat",
  villa: "Villa",
  independenthouse: "Independent House",
  "independent house": "Independent House",
  pg: "PG",
  hostel: "Hostel"
};

const PARKING_MAP = {
  basement: "Basement",
  open: "Open",
  covered: "Covered",
  none: "None",
  noparking: "None",
  "no parking": "None"
};

const FURNISHING_MAP = {
  unfurnished: "Unfurnished",
  semifurnished: "Semi-Furnished",
  "semi-furnished": "Semi-Furnished",
  fullyfurnished: "Fully-Furnished",
  "fully-furnished": "Fully-Furnished"
};

const WATER_SUPPLY_MAP = {
  municipal: "Municipal",
  borewell: "Borewell",
  both: "Both"
};

const INTERNET_MAP = {
  fiber: "Fiber",
  broadband: "Broadband",
  none: "None"
};

const normalizeValue = (value) =>
  value.toLowerCase().replace(/\s+/g, "");

module.exports = {
  PROPERTY_TYPE_MAP,
  PARKING_MAP,
  FURNISHING_MAP,
  WATER_SUPPLY_MAP,
  INTERNET_MAP,
  normalizeValue
};
