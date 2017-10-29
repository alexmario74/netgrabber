'use strict'

module.exports.scheduleLoadNewDevices = ({
    deviceSource, 
    deviceCache, 
    MakeDevice,
    storeDeviceInCache,
    errorHandling
}, interval = 20000) => 
    setInterval(() => {
        deviceSource.loadNewDevices()
            .then(devices => 
                storeDeviceInCache(deviceCache, 
                    devices.map(MakeDevice)))
            .catch(errorHandling);
        }, interval);

exports = module.exports;