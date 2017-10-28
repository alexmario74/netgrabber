'use strict'

exports = module.exports.MakeDeviceSource = () => ({
    loadNewDevices: function () {
        return new Promise((resolve, _) => {
                resolve([{
                id: 1,
                name: 'device-1',
                measures: ['LTE_AVAILABILITY', 'LTE_ATTEMPTS', 'LTE_DOWNTIME']
            },
            {
                id: 2,
                name: 'device-2',
                measures: ['LTE_AVAILABILITY', 'LTE_ATTEMPTS', 'LTE_DOWNTIME']
            },
            {
                id: 3,
                name: 'device-3',
                measures: ['LTE_AVAILABILITY', 'LTE_ATTEMPTS', 'LTE_DOWNTIME']
            },
            {
                id: 4,
                name: 'device-4',
                measures: ['LTE_AVAILABILITY', 'LTE_ATTEMPTS', 'LTE_DOWNTIME']
            },
            {
                id: 5,
                name: 'device-5',
                measures: ['LTE_AVAILABILITY', 'LTE_ATTEMPTS', 'LTE_DOWNTIME']
            }]);
        });
    }
})