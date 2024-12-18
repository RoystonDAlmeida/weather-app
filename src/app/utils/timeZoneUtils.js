// utils/timeZoneUtils.js

// Country code to time zone mapping
const countryTimeZoneMapping = {
    'AD': 'Europe/Andorra',
    'AE': 'Asia/Dubai',
    'AF': 'Asia/Kabul',
    'AG': 'America/Antigua',
    'AI': 'America/Anguilla',
    'AL': 'Europe/Tirane',
    'AM': 'Asia/Yerevan',
    'AO': 'Africa/Luanda',
    'AR': 'America/Argentina/Buenos_Aires',
    'AS': 'Pacific/Pago_Pago',
    'AT': 'Europe/Vienna',
    'AU': 'Australia/Sydney',
    'AW': 'America/Aruba',
    'AX': 'Europe/Mariehamn', // Åland Islands
    'AZ': 'Asia/Baku',

    // B
    'BA': 'Europe/Sarajevo',
    'BB': 'America/Barbados',
    'BD': 'Asia/Dhaka',
    'BE': 'Europe/Brussels',
    'BF': 'Africa/Ouagadougou',
    'BG': 'Europe/Sofia',
    'BH': 'Asia/Bahrain',
    'BI': 'Africa/Gitega',
    'BJ': 'Africa/Porto-Novo',
    'BL': 'America/St_Barthelemy', // Saint Barthélemy
    'BM': 'Atlantic/Bermuda',
    'BN': 'Asia/Bandar_Seri_Begawan', // Brunei
    'BO': 'America/La_Paz',
    'BQ': 'America/Kralendijk', // Bonaire, Sint Eustatius and Saba
    'BR': "America/Sao_Paulo",
    "BS": "America/Nassau",
    "BT": "Asia/Thimphu",
    "BV": "Atlantic/Bouvet", // Bouvet Island
    "BW": "Africa/Gaborone",
    "BY": "Europe/Minsk",
    "BZ": "America/Belize",

   // C
   "CA": "America/Toronto",
   "CC": "Australia/Cocos",
   "CD": "Africa/Kinshasa",
   "CF": "Africa/Bangui",
   "CG": "Africa/Brazzaville",
   "CH": "Europe/Zurich",
   "CI": "Africa/Abidjan",
   "CK": "Pacific/Rarotonga",
   "CL": "America/Santiago",
   "CM": "Africa/Douala",
   "CN": "Asia/Shanghai",
   "CO": "America/Bogota",
   "CR": "America/Costa_Rica",

   // D
   "CU": "America/Havana",
   "CV": "Atlantic/Cape_Verde",
   "CW": "America/Curacao", // Curaçao
   "CX": "Australia/Christmas", // Christmas Island
   "CY": "Asia/Nicosia",
   "CZ": "Europe/Prague",

   // E
   "DE": "Europe/Berlin",
   "DJ": "Africa/Djibouti",
   "DK": "Europe/Copenhagen",
   "DM": "America/Dominica",
   "DO": "America/Santo_Domingo",

   // F
   // No countries starting with F in ISO 3166-1 alpha-2 standard.

   // G
   // No countries starting with G in ISO 3166-1 alpha-2 standard.

   // H
   // No countries starting with H in ISO 3166-1 alpha-2 standard.

   // I
   // No countries starting with I in ISO 3166-1 alpha-2 standard.

   // J
   // No countries starting with J in ISO 3166-1 alpha-2 standard.

   // K
   // No countries starting with K in ISO 3166-1 alpha-2 standard.
   'KW':'Asia/Kuwait',

   // L
   // No countries starting with L in ISO 3166-1 alpha-2 standard.

   // M
      // No countries starting with M in ISO 3166-1 alpha-2 standard.

      // N
      // No countries starting with N in ISO 3166-1 alpha-2 standard.

      // O
      // No countries starting with O in ISO 3166-1 alpha-2 standard.

      // P
      // No countries starting with P in ISO 3166-1 alpha-2 standard.

      // Q
      // No countries starting with Q in ISO 3166-1 alpha-2 standard.

      // R
      // No countries starting with R in ISO 3166-1 alpha-2 standard.

      // S
      // No countries starting with S in ISO 3166-1 alpha-2 standard.

      // T
      // No countries starting with T in ISO 3166-1 alpha-2 standard.

      // U
      // No countries starting with U in ISO 3166-1 alpha-2 standard.

      // V
      // No countries starting with V in ISO 3166-1 alpha-2 standard.

      // W
      // No countries starting with W in ISO 3166-1 alpha-2 standard.

      // X, Y, Z are not used as country codes in ISO 3166-1 alpha-2 standard.
};

// Function to get local time based on country code
const getLocalTimeByCountryCode = (countryCode) => {
  const timezone = countryTimeZoneMapping[countryCode];

  if (!timezone) {
      throw new Error('Timezone not found for the provided country code');
  }

  const utcDate = new Date(); 
  const options = {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, 
  };

  const localTimeString = new Intl.DateTimeFormat('en-US', options).format(utcDate);
  
  return localTimeString;
};

// Exporting the mapping and helper function for use in other files.
export { countryTimeZoneMapping, getLocalTimeByCountryCode };
