var Setting = require('../models/setting');
var fs = require('fs');
var nPerUp = 0;
var path = require('path');

exports.AddSetting = function (req, res, next) {
    try {
        console.log('addSetting');
        var payLoad = req.body;
        var setting = new Setting();
        setting.uploadPath = payLoad.uploadPath;
        setting.uploadTmpPath = payLoad.uploadTmpPath;
        setting.maxPostSize = payLoad.maxPostSize;
        setting.maxFileSize = payLoad.maxFileSize;
        Setting.create(setting, function (err, data) {
            if (err) {
                res.send({ "error": err, "status": res.status });
            }
            else {
                res.send({ "data": data });
            }
            res.end();
        });
    }
    catch (err) {
        console.log('catch');
        console.log(err);
        res.send({ "error": err, "status": res.status });
        res.end();
    }
};

exports.DeleteSetting = function (req, res, next) {
    try {
        console.log('deleteSetting');
        Setting.remove({ _id: req.params.id }).exec(function (err, result) {
                if (err) {
                    res.send({ "error": err, "status": res.status });
                    res.end();
                }
                else {
                    res.json({ message: 'Setting deleted!', "status": res.status });
                    res.end();
                }
            });
        
    }
    catch (err) {
        res.send({ "error": err, "status": res.status });
        res.end();
    }
};

exports.UpdateSetting = function (req, res, next) {
    try {
        var payLoad = req.body;        
        Setting.findById(req.params.id, function (err, doc) {
            doc.uploadPath = payLoad.uploadPath;
            doc.uploadTmpPath = payLoad.uploadTmpPath;
            doc.maxPostSize = payLoad.maxPostSize;
            doc.maxFileSize = payLoad.maxFileSize;
            if (err) {
                res.send({ "error in find": err, "status": res.status });
                res.end();
            }
            else {
                doc.save(
                    function (err, re) {
                        if (err) {
                            console.log(err);
                            res.send({ "error in save": err, "status": res.status });
                            res.end();
                        }
                        else {
                            res.json({ "setting": re });
                            res.end();
                        }
                    });
            }
            });
    }
    catch (err) {
        console.log('catch');
        console.log(err);
        res.send({ "error": err, "status": res.status });
        res.end();
    }
};

exports.GetSettings = function (req, res, next) {
    try {
        console.log('GetSettings');
        var query = Setting.find({});
        query.exec(function (err, result) {
            if (err) {
                res.send({ "error": err, "status": res.status });
            }
            else {
                res.send(result);
            }
            res.end();
        });
    } catch (err) {
        res.send({ "catch error": err, "status": res.status });
        res.end();
    }
};

exports.GetSettingInfo = function (req, res, next) {
    try {
        console.log('getSettingInfo');
        console.log(req.params);
        var query = Setting.find({ "_id": req.params.id });
        // this allows you to continue applying modifiers to it
        //query.sort('name');
        //query.select('name');

        query.exec(function (err, result) {
            if (err) {
                res.send({ "error": err, "status": res.status });
            }
            else {
                res.send(result);
            }
            res.end();
        });
    } catch (err) {
        res.send({ "error": err, "status": res.status });
        res.end();
    }

};