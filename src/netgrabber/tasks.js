'use strict'

const loadDeviceFromService = (service, MakeDevice) => {
    return service.loadNewDevices()
        .then(devices => 
            (devices.map(MakeDevice)));
}

const storeDeviceInCache = (cache, devices) => {
    if (!devices) 
        return;

    const len = cache.store(devices);
}

module.exports.loadDeviceFromService = loadDeviceFromService;
module.exports.storeDeviceInCache = storeDeviceInCache;

exports = module.exports;