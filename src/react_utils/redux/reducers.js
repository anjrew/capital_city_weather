export default function reducer(state = {}, action) {
    console.log('IN reducer with action ', action, ' and state ', state);

    switch (action.type) {

        // GET WEATHER
        case "GET_WEATHER_PENDING":
            return {
                ...state,
                hasCity: 'loading',
                message: null,
                loading:true
            };

        case "GET_WEATHER_FULFILLED":{
            const data = action.payload.data;
            return {
                ...state,
                status: 'hasData',
                weather: { 
                    description: data.weather[0].description,
                    temp: data.main.temp,
                    tempMin: data.main.temp_min,
                    tempMax: data.main.temp_max,
                    pressure: data.main.pressure,
                    humidity: data.main.humidity,
                    windSpeed: data.wind.speed,
                    windDirection: data.wind.deg
                },
                loading: false
            };
        }

        case "GET_WEATHER_REJECTED":
            return {
                ...state,
                status: 'error',
                message: "The request for the weather of this city did not work :/",
                loading: false
            };

        // GET CITYS
        case "GET_CITYS_PENDING":
            return {
                ...state,
                citys: action.payload,
            };

        case "GET_CITYS_FULFILLED":
            return {
                ...state,
                citys: action.payload,
                showResults: true
            };

        case "GET_CITYS_REJECTED":
            return {
                ...state,
                citys: null,
                message: action.payload,
                showResults: false
            };
			
        case "GET_CURRENT_LOCATION_PENDING":
            return {
                ...state,
                currentLocation: "PENDING",
            };
	
        case "GET_CURRENT_LOCATION_FULFILLED":
            return {
                ...state,
                citys: action.payload,
            };
	
        case "GET_CURRENT_LOCATION_REJECTED":
            return {
                ...state,
                status: 'error',
                message: action.payload
            };

        case "SHOW_RESULTS":
            return {
                ...state,
                showResults: true,
                status: "noData"
            };

        case "HIDE_RESULTS":
            return {
                ...state,
                showResults: false,
            };
			
        case "LOADING":
            return {
                ...state,
                status: 'loading',
            };
			
        case "CHOOSE_CITY":
            return {
                ...state,
                query: action.payload,
                showResults: false
            };

        case "UPDATE_QUERY":
            return {
                ...state,
                query: action.payload,
                showResults: true
            };
        case "EMPTY_QUERY":
            return {
                ...state,
                query: '',
                showResults: false
            };
			
        case "NO_QUERY":
            return {
                ...state,
                status: 'error',
                message: "Please type the name of the city.",
                loading: false
            };
			
        default:
            return state;
    }

}