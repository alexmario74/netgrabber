'use strict'

module.exports.scheduleLoadNewDevices = ({
    deviceSource, 
    deviceCache, 
    MakeDevice,
    errorHandling
}, interval = 20000) => 
    setInterval(() => {
        deviceSource.loadNewDevices()
            .then(devices => 
                deviceCache.store(devices.map(MakeDevice)))
            .catch(errorHandling);
        }, interval);

exports = module.exports;