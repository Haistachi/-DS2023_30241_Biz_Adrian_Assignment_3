function showError(message) {console.log(message);}

function getDevices(callback)
{
    fetch("http://localhost:8081/device", {
        headers: {
            "Content-Type": "application/json"},
        method: "get",
    }).then((response) => {
        if (response.status === 200) return response.json();
    }).then((response) => {
        callback(response, response.status, null);
    }).catch((response)=>{
        showError("User get devices fail");
        callback(null, response.status, response);
    });
}

function getActives(callback)
{
    fetch("http://localhost:8082/active", {
        headers: {
            "Content-Type": "application/json"},
        method: "get",
    }).then((response) => {
        if (response.status === 200) return response.json();
    }).then((response) => {
        callback(response, response.status, null);
    }).catch((response)=>{
        showError("User get active fail");
        callback(null, response.status, response);
    });
}

function findOwnerDevices(owner, callback)
{
    fetch("http://localhost:8082/device/" + owner, {
        headers: {
            "Content-Type": "application/json"},
        method: "get",
    }).then((response) => {
            if (response.status === 200) return response.json();
    }).then((response) => {
        callback(response, response.status, null);
    }).catch((response)=>{
        showError("User get his devices fail");
        callback(null, response.status, response);
    });
}

function findDeviceActive(idDevice, date, callback)
{
    fetch("http://localhost:8082/active/" + idDevice + "/" + date.toISOString().split("T")[0], {
        headers: {
            "Content-Type": "application/json"},
        method: "get",
    }).then((response) => {
        if (response.status === 200) return response.json();
    }).then((response) => {
        callback(response, response.status, null);
    }).catch((response)=>{
        showError("User get active fail");
        callback(null, response.status, response);
    });
}

export {
    getDevices,
    getActives,
    findOwnerDevices,
    findDeviceActive
};