var Promise = require('bluebird');
var fs = require("fs");

exports.getProvinces = {
    name: 'provinces',
    description: '获取全部的省份',
    outputExample: {},
    middleware: [],

    inputs: {},

    run: function (api, data, next) {
        api.services.location.findAllProvinces(api).then(function (result) {
            data.response.result = result;
            next();
        }).catch(next);
    }

};

exports.getCities = {
    name: 'cities',
    description: '根据省份id获得城市',
    outputExample: {},
    middleware: [],

    inputs: {
        pid:{required:true}
    },

    run: function (api, data, next) {
        api.services.location.findCitiesByPid(api,data.params.pid).then(function (result) {
            data.response.result = result;
            next();
        }).catch(next);
    }

};

exports.getRegions = {
    name: 'regions',
    description: '根据城市id获得区域',
    outputExample: {},
    middleware: [],

    inputs: {
        cid:{required:true}
    },

    run: function (api, data, next) {
        api.services.location.findRegionsByCid(api,data.params.cid).then(function (result) {
            data.response.result = result;
            next();
        }).catch(next);
    }

};

exports.getRegionById = {
    name: 'region',
    description: '获得区域信息,包括省、市、区',
    outputExample: {},
    middleware: [],

    inputs: {
        id:{required:true}
    },

    run: function (api, data, next) {
        api.services.location.findRegionById(api,data.params.id).then(function (result) {
            var region = result.get({plain: true});
            var city = region && region.city ? region.city : null;
            var province = city && city.province ? city.province : null;

            delete region.city.province;
            delete region.city;

            data.response.result = {
                province: province,
                city: city,
                region: region
            };
            next();
        }).catch(next);
    }
};

exports.getCityById = {
    name: 'city',
    description: '获得城市信息,包括省、市',
    outputExample: {},
    middleware: [],

    inputs: {
        id:{required:true}
    },

    run: function (api, data, next) {
        api.services.location.findCityById(api,data.params.id).then(function (result) {
            var city = result.get({plain: true});
            var province = city && city.province ? city.province : null;

            delete city.province;

            data.response.result = {
                province: province,
                city: city
            };
            next();
        }).catch(next);
    }
};

exports.getProvinceById = {
    name: 'province',
    description: '获得省份信息',
    outputExample: {},
    middleware: [],

    inputs: {
        id:{required:true}
    },

    run: function (api, data, next) {
        api.services.location.findProvinceById(api,data.params.id).then(function (result) {
            data.response.result = {
                province: result
            };
            next();
        }).catch(next);
    }
};

exports.initLocationJs = {
    name: 'initLocationJs',
    description: '初始化前端location.js',
    outputExample: {},
    middleware: [],

    inputs: {
    },

    run: function (api, data, next) {
        Promise.all([
            api.services.location.findAllProvinces(api),
            api.services.location.findAllCities(api),
            api.services.location.findAllRegions(api)
        ]).spread(function (provinces, cities, regions) {
            var provinceText = '';
            var provinceMap = {};
            provinces.forEach(function (province) {
                provinceText += '        "'+province.id+'": ' + '"'+province.name+'",\n';
                provinceMap[province.id] = province.name;
            });

            var cityText = '';
            var cityMap = {};
            cities.forEach(function (city) {
                var cityName = getCityName(provinceMap[city.provinceId], city.name);
                cityText += '        "'+city.id+'": ' + '"'+cityName+'",\n';
                cityMap[city.id] = cityName;
            });

            var regionText = '';
            regions.forEach(function (region) {
                var regionName = cityMap[region.cityId] + region.name;
                regionText += '        "'+region.id+'": ' + '"'+regionName+'",\n';
            });

            var locationText =
                'var LOCATION = {\n' +
                '    privinces: {\n' +
                provinceText +
                '    },\n' +
                '    cities: {\n' +
                cityText +
                '    },\n' +
                '    regions: {\n' +
                regionText +
                '    }\n' +
                '};\n';

            fs.writeFile(api.projectRoot + '/public/app/location.js', locationText, function (err) {
                if (err) throw err;
            });
            data.response.result = locationText;
            next();
        }).catch(next);
    }
};

function getCityName (provinceName, cityName) {
    if (!provinceName)
        provinceName = '';

    if (!cityName)
        cityName = '';

    provinceName  = String(provinceName);
    cityName = String(cityName);

    return provinceName === cityName ? provinceName : provinceName + cityName;
}

