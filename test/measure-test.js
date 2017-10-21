const assert = require('assert');
const MakeMeasure = require('../src/netgrabber/measure');
const MakeDevice = require('../src/netgrabber/device');

describe('Netgrabber should handle a measure', () => {
    it('A measure should have an id', () => {
        let measure = MakeMeasure();
        assert(measure.id() === null);

        measure = MakeMeasure({id: 1});
        assert.strictEqual(measure.id(), 1);
    })

    it('A measure should have a name', () => {
        const measure = MakeMeasure({name: 'measure'});
        assert.strictEqual(measure.name(), 'measure');
    })

    it('If no name is provided, the measure should return null', () => {
        const measure = MakeMeasure();
        assert.strictEqual(measure.name(), null);
    })

    it('A measure should have a start time', () => {
        const measureDate = new Date();
        const measure = MakeMeasure({time: measureDate});
        assert.notEqual(measure.startTime(), null);
        assert.equal(measure.startTime().getTime(), measureDate.getTime());
    })

    it('If no time is provided the measure should return null', () => {
        const measure = MakeMeasure();
        assert.strictEqual(measure.startTime(), null);
    })

    it('A measure should have a duration of 15 by default', () => {
        const measure = MakeMeasure();
        assert.strictEqual(measure.duration(), 15);
    })

    it('It should be possible to have a duration different from default', () => {
        const measure = MakeMeasure({duration: 30});
        assert.strictEqual(measure.duration(), 30);
    })

    it('A measure should have a value', () => {
        const measure = MakeMeasure({value: 12.21});
        assert.equal(measure.value(), 12.21);
    })

    it('If no value is provided the measure should return null', () => {
        const measure = MakeMeasure();
        assert.strictEqual(measure.value(), null);
    })

    it('A measure should be serializable', () => {
        let measure = MakeMeasure();
        assert.strictEqual(measure.serialize(), "{}")
        measure = MakeMeasure({name: 'measure', time: '2017-10-06T13:06:43.887Z', value: 12.1})
        assert.strictEqual(measure.serialize(),
            '{"name":"measure","time":"2017-10-06T13:06:43.887Z","value":12.1}')
        
        measure = MakeMeasure({
            name: 'measure', 
            time: '2017-10-06T13:06:43.887Z', 
            value: 12.1
        }, MakeDevice({id: 1}));

        assert.strictEqual(measure.serialize(),
            '{"name":"measure","time":"2017-10-06T13:06:43.887Z","value":12.1,"device":1}')
    })

    it('A measure should refer to a device', () => {
        const measure = MakeMeasure();
        assert.strictEqual(typeof measure.device(), 'object');

        const measure1 = MakeMeasure({}, MakeDevice({id: 1}));
        assert.strictEqual(measure1.device().id(), 1);
    })

    it('Should be possible to have multiple measures', () => {
        const measure1 = MakeMeasure({name: 'measure1', time: '2017-10-06T13:06:43.887Z', value: 12.1});
        const measure2 = MakeMeasure({name: 'measure2', time: '2017-10-06T13:07:43.887Z', value: 11.2});
        const measure3 = MakeMeasure({name: 'measure3', time: '2017-10-06T13:08:43.887Z', value: 10.3});
    
        assert(measure1.name() === 'measure1' && 
            measure2.name() === 'measure2' &&
            measure3.name() === 'measure3')
    })
})