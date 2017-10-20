'use strict'

let _measureId = 0;

const measureId = _ => (_measureId++)

const measureTime = time => {
    let rop = new Date(time.getTime());
    rop.setMilliseconds(0);
    rop.setSeconds(0);
    const realMinute = rop.getMinutes();

    if (realMinute < 15) {
        rop.setMinutes(0);
        return rop;
    }

    if (realMinute < 30) {
        rop.setMinutes(15);
        return rop;
    }

    if (realMinute < 45) {
        rop.setMinutes(30);
        return rop;
    }

    if (realMinute < 59) {
        rop.setMinutes(45);
    }

    return rop;
}

const grabMeasureValue = measure => (+(Math.random()*100).toPrecision(4));

const grabMeasures = (measures, time) => 
    (measures
        .map(measure => ({
            id: measureId(), 
            name: measure, 
            time: measureTime(time), 
            value: grabMeasureValue(measure)
        }))
    )

const MakeGrabber = (MakeMeasure) => 
    (devices, time = new Date()) => {
        const measures = [];

        for (let i = 0; i < devices.length; i++) {
            let measuresData = grabMeasures(devices[i].availableMeasures(), time);

            for (let j = 0; j < measuresData.length; j++) {
                let measure = MakeMeasure(measuresData[j], devices[i]);
                measures.push(measure);        
            }
        }

        return measures;
    }

exports = module.exports = MakeGrabber;
