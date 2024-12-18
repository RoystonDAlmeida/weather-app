// utils/formatDate.js 

const formatDate = (date, countryCode) => { 
    const options = { weekday: 'short', month: 'short', day: 'numeric' }; 
    return new Intl.DateTimeFormat(countryCode, options).format(date); 
}; 

export default formatDate;