import axios from "../axios";

// All aJax requests will go from this file
export const action = {

    getWeather:(city) => {
        if(city){
            return ({
                type: "GET_WEATHER",
                payload: axios.get(`/get-weather/${city}`)
            });
        } else {
            return {
                type: "NO_QUERY",
            };
        }
    },
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
