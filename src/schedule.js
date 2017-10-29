'use strict'

const debug = require('debug')('ng:scheduler');

const makeSchedulerCancellation = cancel => _ => clearInterval(cancel);

module.exports.scheduleLoadNewDevices = ({
    deviceSource, 
    deviceCache, 
    MakeDevice,
    errorHandling
}, interval = 20000) => 
    makeSchedulerCancellation(setInterval(() => {
        debug('start to load devices');
        deviceSource.loadNewDevices()
            .then(devices => 
                deviceCache.store(devices.map(MakeDevice)))
            .catch(errorHandling);
        }, interval));

module.exports.scheduleGrabMeasures = ({
    grabber,
    measureCache,
    deviceCache,
    MakeDevice
}, rop, interval = 60000) => 
    makeSchedulerCancellation(setInterval(() => {
        debug('start to grab measures');
        measureCache.store(
            grabber(deviceCache
                    .getAll().map(MakeDevice), 
                rop));
    }, interval));

exports = module.exports;