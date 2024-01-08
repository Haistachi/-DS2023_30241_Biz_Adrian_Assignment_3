function showError(message) {console.log(message);}

function getActives(callback)
{
    fetch("http://localhost:8083/measurement", {
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

function findDevicesByOwner(owner, callback)
{
    console.log(`Call devices with owner id = ${owner}`);
    fetch("http://localhost:8082/device/owner/" + owner, {
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
    fetch("http://localhost:8083/measurement/findByDeviceAndDate/" + idDevice + "/" + date.toISOString().split(".")[0], {
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

function findPersonIdByName(name, callback)
{
    console.log(name);
    fetch("http://localhost:8081/person/id/" + name, {
        headers: {
            "Content-Type": "application/json"},
        method: "get",
    })
        .then((response) => {
            if (response.status === 200) return response.text();
        }).then((response) => {
        callback(response, response.status, null);
    }).catch((response)=>{
        showError("User find id fail");
        callback(null, response.status, response);
    });
}

export {
    getActives,
    findDevicesByOwner,
    findDeviceActive,
    findPersonIdByName
};