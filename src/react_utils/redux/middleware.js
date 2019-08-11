import axios from "../axios";

export const parseCitysResp = store => next => action => {
    if (action.type === "GET_CITYS_FULFILLED") {
        action.payload = action.payload.map((item) => item.capital);
    }
    next(action);
};
