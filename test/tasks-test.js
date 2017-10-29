const assert = require('assert');
const MakeDevice = require('../src/netgrabber/device');
const tasks = require('../src/netgrabber/tasks');

const emptyDevices = [];
const devices = [{
    id: 1,
    name: 'device1',
    measures: ["AVAILABILITY", "ATTEMPTS", "DOWNTIME"]
},{
    id: 2,
    name: 'device2',
    measures: ["AVAILABILITY", "ATTEMPTS", "DOWNTIME", "BEARER_ATTEMPTS"]
},{
    id: 3,
    name: 'device3',
    measures: ["AVAILABILITY", "DOWNTIME"]
}];

const serviceStub = (devs) => {
    return {
        loadNewDevices: function () {
            return new Promise((resolve, reject) => {
                resolve(devs);
            });
        }
    };
}

const cacheStub = () => {
    const _devs = [];
    return {
        store: function (ds = []) {
            ds.map(d => {
                _devs.push(d);
            });
        },
        getAll: function () {
            return _devs;
        }
    }
}

describe('Netgrabber should work with services', () => {
    it('loadDeviceFromService should return a promise', (done) => {
        const ret = tasks.loadDeviceFromService(serviceStub(emptyDevices), MakeDevice);
        assert(ret.then !== undefined, 'the return value is not a promise!');
        assert(ret.catch !== undefined, 'the return value is not a promise!');
        ret.then(() => (done()))
        .catch(done);
    })

    it('loadDeviceFromService should resolve in a list of valid device objects', (done) => {
        const ret = tasks.loadDeviceFromService(serviceStub(devices), MakeDevice);
        ret.then(devs => {
            assert.strictEqual(devs.length, devices.length, 'the returned list shoul have the same length');
            assert.strictEqual(typeof devs[0] , 'object', 'each devices should be a object');
            const i = Math.floor(Math.random()*(devs.length-1));
            assert.strictEqual(devs[i].name(), devices[i].name, 
                'each device should preserve the original data, check idx ' + i);
            done();
        })
        .catch(done);
    })
});