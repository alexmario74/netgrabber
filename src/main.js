const lokijs = require('lokijs');
const debug = require('debug')('netgrabber');

const MakeDevice = require('./netgrabber/device');
const MakeMeasure = require('./netgrabber/measure');
const MakeGrabber = require('./netgrabber/grabber');

const { MakeCache } = require('./service/lokidb');
const { MakeDeviceSource } = require('./service/device-source');

const { scheduleLoadNewDevices, scheduleGrabMeasures } = require('./schedule');

debug('load dependencies');

const main = (db) => {
    debug('db loaded');
    
    const deviceCache = MakeCache(db, 'device');
    const measureCache = MakeCache(db, 'measure');
    const deviceSource = MakeDeviceSource(redisOptions());

    const cancelLoadDevices = scheduleLoadNewDevices({
        deviceSource, deviceCache, MakeDevice, errorHandling
    });

    const grabber = MakeGrabber(MakeMeasure);

    const cancelGrabMeasure = scheduleGrabMeasures({
        grabber, measureCache, deviceCache, MakeDevice
    }, new Date());

    ['SIGINT', 'SIGILL'].forEach((signal) => 
        process.on(signal, () => {
            cancelLoadDevices();
            cancelGrabMeasure();
            db.close();
            process.exit();
        }));
};

const redisOptions = () => ({
    'host': (process.env.REDIS_HOST || '192.168.99.100'),
    'port': (process.env.REDIS_PORT || 6379)
});

const errorHandling = (err) => {
    debug('ERROR', err);
};

let db = new lokijs('netgrabber.json',
    {
        autoload: true,
        autoloadCallback : () => (main(db)),
        autosave: true, 
        autosaveInterval: 4000
    });