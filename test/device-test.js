const assert = require('assert');
const MakeDevice = require('../src/netgrabber/device')

describe('Netgrabber should handle devices', 
() => {
    it('A device should have an id', () => {
        const device = MakeDevice({id: 1});
        assert(device);
        assert(device.id());
    })

    it('If no id is provided, the device should return null', () => {
        const device = MakeDevice();
        assert(device.id() == null);
    })

    it('A device should have a name', () => {
        const device = MakeDevice({name: 'device1'});
        assert(device.name() == 'device1');
    })

    it('If no name is provided, the device should return null', () => {
        const device = MakeDevice();
        assert(device.name() == null);
    })

    it("A device should have a list of measures", () => {
        const device = MakeDevice({measures: []});
        assert(device.availableMeasures());
    })

    it('If no measures list is provided, the device should return an empty list',
    () => {
        const device = MakeDevice();
        const measures = device.availableMeasures();
        assert(typeof measures === 'object');
        assert(Array.isArray(measures));
        assert(measures.length == 0);
    })

    it('Should be possible to have multiple device each different',
    () => {
        const device1 = MakeDevice({id:1,name:'device1',measures: []});
        const device2 = MakeDevice({id:2,name:'device2',measures: [""]});
        const device3 = MakeDevice({id:3,name:'device3',measures: ["", ""]});

        assert(device1.id() == 1)
        assert(device2.id() == 2) 
        assert(device3.id() == 3)

        assert(device1.name() == 'device1')
        assert(device2.name() == 'device2') 
        assert(device3.name() == 'device3')
        
        assert(device1.availableMeasures().length == 0)
        assert(device2.availableMeasures().length == 1) 
        assert(device3.availableMeasures().length == 2)
    })

    it('Given a device it should be possible to serialize', () => {
        const device = MakeDevice({id: 1, name:'mydevice', measures: [""]});

        assert(device.serialize() == '{"id":1,"name":"mydevice","measures":[""]}',
        'serialized device should be {"id":1,"name":"mydevice","measures":[""]}\nGot\n' + 
            device.serialize());
    })

    it('It should be possible to make a device from a serialized string', 
    () => {
        const device = MakeDevice({id: 1, name:'mydevice', measures: [""]});
        const serializedDevice = device.serialize();

        const resumedDevice = MakeDevice.FromSerialized(serializedDevice);
        assert((resumedDevice.id() === device.id()) && 
            (resumedDevice.name() === device.name()) && 
            (resumedDevice.availableMeasures().length === device.availableMeasures().length));
        
        const emptyDevice = MakeDevice.FromSerialized();
        assert(emptyDevice.id() === null);
    })
});