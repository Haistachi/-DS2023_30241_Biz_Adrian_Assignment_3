const jwtToken=localStorage.getItem("access_token");

function showError(message) {console.log(message);}

function getPersons(callback)
{
    fetch("http://localhost:8081/person", {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${jwtToken}`},
        method: "get",
    }).then((response) => {
        if (response.status === 200) return response.json();
    }).then((response) => {
        callback(response, response.status, null);
    }).catch((response)=>{
        showError("Admin get persons fail");
        callback(null, response.status, response);
    });
}

function insertPerson(user, callback)
{
    fetch("http://localhost:8081/person", {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${jwtToken}`},
        method: "post",
        body: JSON.stringify({"username" : user.name, "userPassword": user.pass, "rol": user.rol})
    })
        .then((response) => {
            if (response.status === 201) return response.text();
        }).then((response) => {
        callback(response, response.status, null);
        }).catch((response)=>{
        showError("Admin insert persons fail");
        callback(null, response.status, response);
        });
}

function deletePerson(userId, callback)
{
    fetch("http://localhost:8081/person/" + userId, {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${jwtToken}`},
        method: "delete",
    })
        .then((response) => {
            if (response.status === 200) return response.text();
        }).then((response) => {
        callback(response, response.status, null);
        }).catch((response)=>{
        showError("Admin delete persons fail");
        callback(null, response.status, response);
    });
}

function updatePerson(user, callback)
{
    fetch("http://localhost:8081/person/" + user.id, {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${jwtToken}`},
        method: "put",
        body: JSON.stringify(user)
    })
        .then((response) => {
            if (response.status === 200) return response.text();
        }).then((response) => {
        callback(response, response.status, null);
    }).catch((response)=>{
        showError("Admin update persons fail");
        callback(null, response.status, response);
    });
}

function getDevices(callback)
{
    fetch("http://localhost:8082/device", {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${jwtToken}`},
        method: "get",
    }).then((response) => {
        if (response.status === 200) return response.json();
    }).then((response) => {
        callback(response, response.status, null);
    }).catch((response)=>{
        showError("Admin get devices fail");
        callback(null, response.status, response);
    });
}

function insertDevice(device, callback)
{
    fetch("http://localhost:8082/device", {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${jwtToken}`},
        method: "post",
        body: JSON.stringify({"person" : device.owner,
            "description": device.desc, "address": device.addr, "consumption": device.consume})
    })
        .then((response) => {
            if (response.status === 201) return response.text();
        }).then((response) => {
        callback(response, response.status, null);
    }).catch((response)=>{
        showError("Add device fail");
        callback(null, response.status, response);
    });
}

function deleteDevice(deviceId, callback)
{
    fetch("http://localhost:8082/device/" + deviceId, {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${jwtToken}`},
        method: "delete",
    })
        .then((response) => {
            if (response.status === 200) return response.text();
        }).then((response) => {
        callback(response, response.status, null);
    }).catch((response)=>{
        //showError("Admin delete device fail");
        callback(null, response.status, response);
    });
}

function updateDevice(device, callback)
{
    fetch("http://localhost:8082/device/" + device.id, {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${jwtToken}`},
        method: "put",
        body: JSON.stringify(device)
    })
        .then((response) => {
            if (response.status === 200) return response.text();
        }).then((response) => {
        callback(response, response.status, null);
    }).catch((response)=>{
        showError("Admin update delete fail");
        callback(null, response.status, response);
    });
}

function updateTreshhold(device, treshhold, callback)
{
    fetch("http://localhost:8083/treshhold/update/" + device +"/"+ treshhold, {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${jwtToken}`},
        method: "put",
    })
        .then((response) => {
            if (response.status === 200) return response.text();
        }).then((response) => {
        callback(response, response.status, null);
    }).catch((response)=>{
        showError("Admin updateTreshhold fail");
        callback(null, response.status, response);
    });
}

function insertTreshhold(device, treshhold, callback)
{
    console.log("aici in functie: "+ device+" -- "+ treshhold)
    fetch("http://localhost:8083/treshhold/insert/" + device + "/" + treshhold, {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${jwtToken}`},
        method: "post"
    })
        .then((response) => {
            if (response.status === 201) return response.text();
        }).then((response) => {
        callback(response, response.status, null);
    }).catch((response)=>{
        showError("Admin insert Treshhold fail");
        callback(null, response.status, response);
    });
}

function deleteTreshhold(device, callback)
{
    fetch("http://localhost:8083/treshhold/deleteByDevice/" + device, {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${jwtToken}`},
        method: "delete",
})
.then((response) => {
    if (response.status === 200) return response.text();
}).then((response) => {
    callback(response, response.status, null);
}).catch((response)=>{
    showError("Admin delete Treshhold fail");
    callback(null, response.status, response);
});
}

function deleteActive(device, callback)
{
    console.log(device);
    fetch("http://localhost:8083/measurement/delete/findByDevice/" + device, {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${jwtToken}`},
        method: "delete"
    })
        .then((response) => {
            if (response.status === 200) return response.text();
        }).then((response) => {
        callback(response, response.status, null);
    }).catch((response)=>{
        showError("Admin delete Measurement fail");
        callback(null, response.status, response);
    });
}

export {
    getDevices,
    insertDevice,
    deletePerson,
    insertPerson,
    getPersons,
    deleteDevice,
    updatePerson,
    updateDevice,
    updateTreshhold,
    insertTreshhold,
    deleteTreshhold,
    deleteActive
};