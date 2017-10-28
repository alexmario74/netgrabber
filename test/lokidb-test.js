const assert = require('assert');
const lokijs = require('lokijs');
const cache = require('../src/service/lokidb');
const MakeDevice = require('../src/netgrabber/device');
const MakeMeasure = require('../src/netgrabber/measure');

const db = new lokijs('test.json');

describe('(Cache) LokiJS', () => {
    it('should create a cache for devices', () => {
        const devices = cache.MakeCache(db, 'device');
        
        assert(devices != null, 'devices should not be null');
        assert(devices.store != null, 'devices should have a store method');
        assert(devices.getAll != null, 'devices should have a getAll method');
    })

    it('should create multiple cache', () => {
        const devices = cache.MakeCache(db, 'device');
        const measures = cache.MakeCache(db, 'measure');

        devices.store(MakeDevice({
            id: 1,
            name: 'device1',
            measures: ["meaure1"]
        }));

        const devs = devices.getAll();

        console.log('devices', devs);
    })
});