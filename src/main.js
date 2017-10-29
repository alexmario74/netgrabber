const lokijs = require('lokijs');
const debug = require('debug')('netgrabber');

const MakeDevice = require('./netgrabber/device');
const MakeMeasure = require('./netgrabber/measure');
const { MakeCache } = require('./service/lokidb');
const { MakeDeviceSource } = require('./service/device-source');

const { loadDeviceFromService, storeDeviceInCache } = require('./netgrabber/tasks');

const { scheduleLoadNewDevices } = require('./schedule');

debug('load dependencies');

const main = (db) => {
    ['SIGINT', 'SIGILL'].forEach((signal) => 
        process.on(signal, () => {
            db.close();
            process.exit();
        }));

    debug('db loaded');
    
    const deviceCache = MakeCache(db, 'device');
    const measureCache = MakeCache(db, 'measure');
    const deviceSource = MakeDeviceSource();

    scheduleLoadNewDevices({deviceSource, deviceCache, MakeDevice, storeDeviceInCache, errorHandling});
}

const errorHandling = (err) => {
    debug('ERROR', err);
}

let db = new lokijs('netgrabber.json',
{
    autoload: true,
    autoloadCallback : () => (main(db)),
    autosave: true, 
    autosaveInterval: 4000
});