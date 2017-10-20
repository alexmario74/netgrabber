const assert = require('assert');
const MakeDevice = require('../src/netgrabber/device');
const MakeMeasure = require('../src/netgrabber/measure');

const MakeGrabber = require('../src/netgrabber/grabber');

const grabber = MakeGrabber(MakeMeasure);

describe('Netgrabber should grab the measures', () => {
    const devices = [MakeDevice({
        id:1,
        name:'device1',
        measures: ["AVAILABILITY"]
    }),MakeDevice({
        id:2,
        name:'device2',
        measures: ["AVAILABILITY"]
    }), MakeDevice({
        id:3,
        name:'device3',
        measures: ["DOWNTIME"]
    })];

    it('Given a list of devices it should return a list of measures', 
    () => {
        let rop = new Date();
        rop.setMilliseconds(0);
        rop.setSeconds(0);
        rop.setMinutes(10);
        const measures = grabber(devices, rop);

        assert(measures !== undefined, "measures should not be undefined");
        assert(measures !== null, "measures should not be null");
        assert(Array.isArray(measures), "measures should be an array");
        assert(measures.length === 3, "measures should be 3");
        assert(typeof measures[0] === 'object', "measures should be an array of measures not " + JSON.stringify(measures));
    })

    it('Given differen time it should harmonize the time to 15 minutes', () => {
        let rop = new Date();
        rop.setMilliseconds(0);
        rop.setSeconds(0);
        rop.setMinutes(10);
        let measures = grabber(devices, rop);

        let minutes = measures[0].startTime().getMinutes();
        assert(minutes === 0, 
            "measures should have time harmonized to 15 minutes 0 " + minutes);
        
        rop.setMinutes(18);
        measures = grabber(devices, rop);        
        minutes = measures[0].startTime().getMinutes();
        assert(minutes === 15, 
            "measures should have time harmonized to 15 minutes 15 " + minutes);

        rop.setMinutes(33);
        measures = grabber(devices, rop);        
        minutes = measures[0].startTime().getMinutes();
        assert(minutes === 30, 
            "measures should have time harmonized to 15 minutes 30" + minutes);

        rop.setMinutes(55);
        measures = grabber(devices, rop);        
        minutes = measures[0].startTime().getMinutes();
        assert(minutes === 45, 
            "measures should have time harmonized to 15 minutes 45" + minutes);

    })

    it('Given a device with multiple measures should return a list with all the measures', () => {
        let rop = new Date();
        rop.setMilliseconds(0);
        rop.setSeconds(0);
        const device = MakeDevice({
            id:1,
            name:'device1',
            measures: ["AVAILABILITY", "DOWNTIME", "ATTEMPTED"]
        });
        const measures = grabber([device], rop);

        assert(measures.length === 3, "should generate a list of 3 measures");
        measures.forEach((measure) => {
            assert(measure.device().id() === device.id(), 
                "measures should point to the same device");
        });
    })

    it('If the time is omitted it take the current time', () => {
        const measures = grabber([MakeDevice({
            id:1,
            name:'device1',
            measures: ["AVAILABILITY", "DOWNTIME", "ATTEMPTED"]
        })]);

        measures.forEach((measure) => {
            assert([0, 15, 30, 45].indexOf(measure.startTime().getMinutes()) !== -1, 
                "measures should harmonize the minutes: 0 - 15 - 30 - 45 " + 
                measure.startTime().getMinutes());
        });
    })
})