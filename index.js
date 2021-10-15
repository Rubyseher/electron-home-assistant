'use strict'

const { ipcRenderer } = require('electron')
const {
    createConnection, subscribeEntities, createLongLivedTokenAuth
} = require("home-assistant-js-websocket");

var connection, data

ipcRenderer.on('data2', async (e, data2) => {
    const maindiv = document.getElementById('main')
    const auth = createLongLivedTokenAuth(
        "http://home.local:8123",
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI4ODU4OWM5OGUwMTY0OGNkOTExNjhiYTAzNTkwZDM2MCIsImlhdCI6MTYyNTk4NjE3MiwiZXhwIjoxOTQxMzQ2MTcyfQ.Y2acwi9XkmA4GMGDgjD7beYFVY1hvKFeo7Hn1Rw1Cjk"
    );
    let tempConnection = await createConnection({ auth })
    connection = tempConnection
    subscribeEntities(tempConnection, (entities) => {
        console.log(entities);
        maindiv.innerHTML = Object.keys(entities)
    });
})
