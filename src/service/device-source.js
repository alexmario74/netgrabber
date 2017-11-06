'use strict';

const debug = require('debug')('device-service');
const redis = require('redis');

const onError = err => debug('an error occured on redis:', err);

exports = module.exports.MakeDeviceSource = (redisOpts) => {
    const client = redis.createClient(redisOpts);
    client.on('error', onError);

    return {
        loadNewDevices: function () {
            return new Promise((resolve, reject) => {
                client.hgetall('device:*', (err, devices) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve(devices || []); 
                });
            })
                .catch(onError);
        }
    };
};
