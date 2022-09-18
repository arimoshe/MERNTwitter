const { options } = require("../../backend/routes")

const jwtFetch = async (url, option = {}) => {
    options.method = options.method || "GET";
    options.headers = options.headers || {};
    option.headers['Authorization'] = localStorage.getItem("jwtToken")
    if(options.method.toUpperCase() !== "GET") {
        options.headers['Content-Type'] = option.headers["Content-Type"] || "application/json";
    }
    const res = await fetch(url, options);
    if (res.status >= 400) throw res;
    return res;
}

export default jwtFetch;