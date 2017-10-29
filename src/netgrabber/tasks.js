'use strict'

const loadDeviceFromService = (service, MakeDevice) => {
    return service.loadNewDevices()
        .then(devices => 
            (devices.map(MakeDevice)));
}

module.exports.loadDeviceFromService = loadDeviceFromService;

exports = module.exports;