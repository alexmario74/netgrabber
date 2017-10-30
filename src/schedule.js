'use strict'

const debug = require('debug')('ng:scheduler');

const makeScheduler = (fn, interval) => 
    makeSchedulerCancellation(setInterval(fn, interval));

const makeSchedulerCancellation = cancel => _ => clearInterval(cancel);

module.exports.scheduleLoadNewDevices = ({
    deviceSource, 
    deviceCache, 
    MakeDevice,
    errorHandling
}, interval = 20000) => 
    makeScheduler(() => {
        debug('start to load devices');
        deviceSource.loadNewDevices()
            .then(devices => 
                deviceCache.store(devices.map(MakeDevice)))
            .catch(errorHandling);
        }, interval);

module.exports.scheduleGrabMeasures = ({
    grabber,
    measureCache,
    deviceCache,
    MakeDevice,
    sender
}, rop, interval = 60000) => 
    makeScheduler(() => {
        debug('start to grab measures');
        const devices = deviceCache.getAll().map(MakeDevice);
        const measures = grabber(devices, rop);
        measureCache.store(measures);
        sender && sender.send(measures);
    }, interval);

exports = module.exports;