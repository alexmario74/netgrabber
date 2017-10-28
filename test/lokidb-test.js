const assert = require('assert');
const lokijs = require('lokijs');
const cache = require('../src/service/lokidb');
const MakeDevice = require('../src/netgrabber/device');
const MakeMeasure = require('../src/netgrabber/measure');

const db = new lokijs('test.json');

describe('(Cache) LokiJS', () => {
    afterEach(() => {
        db.removeCollection('measure');
        db.removeCollection('device');
    })

    it('should create a cache for devices', () => {
        const devices = cache.MakeCache(db, 'device');
        
        assert(devices != null, 'devices should not be null');
        assert(devices.store != null, 'devices should have a store method');
        assert(devices.getAll != null, 'devices should have a getAll method');
    })

    it('should create multiple cache', () => {
        const devices = cache.MakeCache(db, 'device');
        const measures = cache.MakeCache(db, 'measure');

        const device = MakeDevice({
            id: 1,
            name: 'device1',
            measures: ["meaure1"]
        });

        devices.store(device);

        const measure = MakeMeasure({name: 'measure', time: '2017-10-06T13:06:43.887Z', value: 12.1}, device);

        measures.store(measure);

        const devs = devices.getAll();

        assert.equal(devs.length, 1, 'should have just 1 device');
        assert.equal(devs[0].name, device.name(), 'should be the same device');

        const meas = measures.getAll();

        assert.equal(meas.length, 1, 'should have just 1 measure');
        assert.equal(meas[0].name, measure.name(), 'should be the same measure');
    })

    it('should be possible to store a list of docs', () => {
        const measures = cache.MakeCache(db, 'measure');

        measures.store([{name: 'measure1', time: '2017-10-06T13:06:43.887Z', value: 12.1},
         {name: 'measure2', time: '2017-10-06T13:06:43.887Z', value: 11.2},
         {name: 'measure3', time: '2017-10-06T13:06:43.887Z', value: 21.1},
         {name: 'measure4', time: '2017-10-06T13:06:43.887Z', value: 2.2}]
        .map(MakeMeasure));

        const allMeasures = measures.getAll();

        assert.equal(allMeasures.length, 4);
        assert.equal(allMeasures
            .filter(m => 
                (["measure1", "measure2", "measure3", "measure4"].indexOf(m.name) === -1))
                .length, 0);
    })

    it('should not perform update if element already exists', () => {
        const devices = cache.MakeCache(db, 'device');

        const device = MakeDevice({
            id: 1,
            name: 'device1',
            measures: ["measure1"]
        });

        devices.store(device);

        const deviceUpdated = MakeDevice({
            id: 1,
            name: 'device1',
            measures: ["measure1", "measure2"]
        });

        devices.store(deviceUpdated);

        const dbDevices = devices.getAll();

        assert.equal(dbDevices.length, 1);
        assert.equal(dbDevices[0].measures.length, 1);
        assert.equal(dbDevices[0].measures[0], 'measure1');
    })

    it('should be able to store devices without an id', () => {
        const devices = cache.MakeCache(db, 'device');

        const device = MakeDevice({
            name: 'device1',
            measures: ['m1', 'm2', 'm3']
        });

        devices.store(device);

        const dbDevices = devices.getAll();

        assert.equal(dbDevices.length, 1);
        assert.equal(dbDevices[0].name, 'device1');
    })
});