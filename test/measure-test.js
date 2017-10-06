const assert = require('assert');
const MakeMeasure = require('../src/netgrabber/measure');
const MakeDevice = require('../src/netgrabber/device');

console.log(MakeMeasure.hello)
describe('Netgrabber should handle a measure', () => {
    it('A measure should have an id', () => {
        let measure = MakeMeasure();
        assert(measure.id() === null);

        measure = MakeMeasure({id: 1});
        assert(measure.id() === 1);
    })

    it('A measure should have a name', () => {
        const measure = MakeMeasure({name: 'measure'});
        assert(measure.name() == 'measure');
    })

    it('If no name is provided, the measure should return null', () => {
        const measure = MakeMeasure();
        assert(measure.name() === null);
    })

    it('A measure should have a start time', () => {
        const measureDate = new Date();
        const measure = MakeMeasure({time: measureDate});
        assert(measure.startTime() !== null);
        assert(measure.startTime().getTime() == measureDate.getTime());
    })

    it('If no time is provided the measure should return null', () => {
        const measure = MakeMeasure();
        assert(measure.startTime() === null);
    })

    it('A measure should have a duration of 15 by default', () => {
        const measure = MakeMeasure();
        assert(measure.duration() === 15);
    })

    it('It should be possible to have a duration different from default', () => {
        const measure = MakeMeasure({duration: 30});
        assert(measure.duration() === 30);
    })

    it('A measure should have a value', () => {
        const measure = MakeMeasure({value: 12.21});
        assert(measure.value() == 12.21);
    })

    it('If no value is provided the measure should return null', () => {
        const measure = MakeMeasure();
        assert(measure.value() === null);
    })

    it('A measure should be serializable', () => {
        let measure = MakeMeasure();
        assert(measure.serialize() === "{}")
        measure = MakeMeasure({name: 'measure', time: '2017-10-06T13:06:43.887Z', value: 12.1})
        assert(measure.serialize() === '{"name":"measure","time":"2017-10-06T13:06:43.887Z","value":12.1}')
        
        measure = MakeMeasure({
            name: 'measure', 
            time: '2017-10-06T13:06:43.887Z', 
            value: 12.1
        }, MakeDevice({id: 1}));

        assert(measure.serialize() === '{"name":"measure","time":"2017-10-06T13:06:43.887Z","value":12.1,"device":1}')
    })

    it('A measure should refer to a device', () => {
        const measure = MakeMeasure();
        assert(typeof measure.device() === 'object');

        const measure1 = MakeMeasure({}, MakeDevice({id: 1}));
        assert(measure1.device().id() === 1);
    })
})