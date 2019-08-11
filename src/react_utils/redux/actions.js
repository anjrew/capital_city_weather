import axios from "../axios";

// All aJax requests will go from this file
export const action = {

    getWeather:(city) => ({
        type: "GET_WEATHER",
        payload: axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1e068bbdea01db25f086a99d94ef7bbc&units=metric`)
    }),
    getCitys:(query) => {
        return (dispatch) => {

            if(!query){
                dispatch({
                    type: "EMPTY_QUERY",
                });
            } else {
                dispatch({
                    type: "UPDATE_QUERY",
                    payload: query
                });
                axios.get(`https://restcountries.eu/rest/v2/capital/${query}`).then((resp) =>{
                    dispatch({
                        type: "GET_CITYS_FULFILLED",
                        payload: resp.data,
                    });}
                ).catch((e) =>{
                    dispatch({
                        type: "GET_CITYS_REJECTED",
                        payload: e,
                    });
                });
            }
        };
    },
	
			
    // getWeather:(lat, long) => ({
    //     type: "GET_WEATHER",
    //     payload: axios.get(`api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}`)
    // }),
	
  
	
    // getCitys:(query) => ({
    //     type: "GET_CITYS",
    //     payload: axios.get(`https://places.cit.api.here.com/places/v1/autosuggest
    // 	?at=40.74917,-73.98529
    // 	&q=${query}
    // 	&app_id=DVTC1tCnM4i8HSouJGl4
    // 	&app_code=2xb1dv9OIWwt4baeLA0u4A
    // 	`),
    //     query: query
    // }),
	
    // getCitys:(query) => ({
    //     type: "GET_CITYS",
    //     payload: axios.get(
    //         `https://andruxnet-world-cities-v1.p.rapidapi.com/?query=${query}&searchby=`,
    //         {headers:{
    //             "X-RapidAPI-Host":"value",
    //             "X-RapidAPI-Key": "670c81d697mshcaabeadccd712c9p11f7dfjsn0e1f9a7e2bac"
    //         }}),
    //     query: query
    // }),
    getCurrentLocation:() => ({
        type: "GET_CURRENT_LOCATION",
    }),
    hideResults:() => ({
        type: "HIDE_RESULTS"
    }),
    showResults:() => ({
        type: "SHOW_RESULTS"
    }),
    chooseCity:(city) => ({
        type: "CHOOSE_CITY",
        payload: city
    }),
    getClosestCity:(query) => {
        return async dispatch => {
            dispatch(action.loading());
            console.log(query);
            let resp;
            try {
                resp = await axios.get(`https://restcountries.eu/rest/v2/capital/${query}`);
                console.log(resp);
                let citys = resp.data.map((item) => item.capital);
                return {
                    type: "GET__CLOSEST_CITY",
                    payload: citys
                };
            } catch (e) {
                return {
                    type: "SHOW_ERROR",
                    payload: e
                };
            }
        };  
    },
    loading: () =>{
        return {
            type: "LOADING"
        };
    }
};
