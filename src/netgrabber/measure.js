'use strict';

const serialize = (_measure, _device) => {
    const _measureCopy = Object.assign({}, _measure);
    if (_device.hasOwnProperty('id')) {
        _measureCopy.device = _device.id();
    }

    return JSON.stringify(_measureCopy);
};

const MakeMeasure = (measure = {}, device = {}) => ({
    id: () => measure.id || null,
    name: () => measure.name  || null,
    startTime: () => measure.time || null,
    duration: () => measure.duration || 15,
    value: () => measure.value || null,
    device: () => device,
    serialize: () => serialize(measure, device)
});

exports = module.exports = MakeMeasure;