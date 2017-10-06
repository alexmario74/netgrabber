'use strict'

const MakeDevice = (device = {}) => ({
    id: () => (device.id || null),
    availableMeasures: () => (device.measures || []),
    name: () => (device.name || null),
    serialize: () => JSON.stringify(device)
});

const fromSerialized = (serializedDevice = "{}") => 
    MakeDevice(JSON.parse(serializedDevice));

exports = module.exports = MakeDevice;

exports.FromSerialized = fromSerialized;