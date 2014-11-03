var User = require('../models/user');
var Setting = require('../models/setting');
var ObjPF = require('./userUploader/ProfileForm');
var fs = require('fs');
var _existsSync = fs.existsSync || path.existsSync;
var nPerUp = 0;
var path = require('path');
var Q = require('q');
var uploadPathG = '';
function CreateUploadPath(username) {    
    Setting.find({}).exec(function (err, result) {
        if (err) {
            res.send({ "error": err, "status": res.status });
            res.end();
        }
        else {
            if (!_existsSync(result[0].uploadPath)) {
                fs.mkdirSync(result[0].uploadPath, [777], function (ret) {
                    console.log('uploadPath');
                    console.log(ret);
                });
            }          
        }
    });
};
function CreateUploadTmpPath() {
    Setting.find({}).exec(function (err, result) {
        if (err) {
            res.send({ "error": err, "status": res.status });
            res.end();
        }
        else {
            if (!_existsSync(result[0].uploadTmpPath)) {
                fs.mkdirSync(result[0].uploadTmpPath, [777], function (ret) {
                    console.log('uploadTmpPath');
                    console.log(ret);
                });
            }
        }
    });
};
function GetSettings() {
    var Server = require("mongo-sync").Server;
    var server = new Server('127.0.0.1');
    var result = server.db("snow_white").getCollection("settings").find().toArray();
    console.log(result);
    server.close();
    //Setting.find({}).exec(function (err, result) {
    //    if (err) {
    //        res.send({ "error": err, "status": res.status });
    //        res.end();
    //    }
    //    else {
    //    }
    //});
};
GetSettings();
exports.LoginUser = function (req, res, next) {
    try {
        console.log('loginUser');
        var loginDetails = {
            password: req.body.password,
            email: req.body.email
        };
        console.log(loginDetails);
        var query = User.findOne(loginDetails);
        //query.select('role');
        query.exec(function (err, data) {
            if (err) {
                res.send({ "error": err, "status": res.status });
            }
            else {

                if (data !== null) {
                    var result = {};
                    result.username = data.username;
                    result.role = data.role;
                    result.status = data.status;
                    result.dob = data.dob;
                    result.userImage = data.image_path;
                    console.log(result);
                    res.json({ "result": result });
                }
                else {
                    res.json({ "result": -1 });
                }
            }

            res.end();
        });
    }
    catch (err) {
        res.send({ "error": err, "status": res.status });
        res.end();
    }
};

exports.AddUser = function (req, res, next) {
    try {
        //console.log('addUser');
        var username = req.params.username;
        
        var user = new User(); 		// create a new instance of the user model
        var now = new Date();

        if (username !== undefined || username !== '') {
            CreateUploadPath(username);
            CreateUploadTmpPath();
            //var nameCountRegexp = /(?:(?: \(([\d]+)\))?(\.[^.]+))?$/,
            //nameCountFunc = function (s, index, ext) {
            //    return ' (' + ((parseInt(index, 10) || 0) + 1) + ')' + (ext || '');
            //};
            //var pathObj = GetPath();
            //var uploadPath = pathObj.uploadPath, tmpDirPath = pathObj.uploadPath;
            //var options = {
            //    tmpDir: tmpDirPath,
            //    uploadDir: uploadPath + username,// + '/public/files',                
            //    maxPostSize: 11000000000, // 11 GB
            //    minFileSize: 1,
            //    maxFileSize: 10000000000, // 10 GB
            //    acceptFileTypes: /.+/i
            //    // Files not matched by this regular expression force a download dialog,
            //    // to prevent executing any scripts in the context of the service domain:                

            //};
            //var FileInfo = function (file) {
            //    this.name = file.name;
            //    this.size = file.size;
            //    this.type = file.type;
            //};
            //FileInfo.prototype.validate = function () {
            //    if (options.minFileSize && options.minFileSize > this.size) {
            //        this.error = 'File is too small';
            //    } else if (options.maxFileSize && options.maxFileSize < this.size) {
            //        this.error = 'File is too big';
            //    } else if (!options.acceptFileTypes.test(this.name)) {
            //        this.error = 'Filetype not allowed';
            //    }
            //    return !this.error;
            //};
            //FileInfo.prototype.safeName = function () {
            //    // Prevent directory traversal and creating hidden system files:
            //    this.name = path.basename(this.name).replace(/^\.+/, '');
            //    // Prevent overwriting existing files:
            //    while (_existsSync(options.uploadDir + '/' + this.name)) {
            //        console.log('t3');
            //        this.name = this.name.replace(nameCountRegexp, nameCountFunc);
            //    }
            //};


            //var form = new ObjPF.ProfileForm({ multiples: false, keepExtensions: true }),
            //    tmpFiles = [],
            //    files = [],
            //    map = {};
            //form.uploadDir = options.uploadDir;

            //form.on('fileBegin', function (name, file) {
            //    if (file) {
            //        console.log('t4');
            //        tmpFiles.push(file.path);
            //        var fileInfo = new FileInfo(file);
            //        fileInfo.safeName();
            //        map[path.basename(file.path)] = fileInfo;
            //        files.push(fileInfo);
            //    }


            //})
            //    .on('field', function (name, value) {
            //        this.value = decodeURIComponent(value)
            //        //console.log(name + ' : ' + decodeURIComponent(value));
            //    })
            //    .on('file', function (name, file) {
            //        //                    console.log('file');
            //        var fileInfo = map[path.basename(file.path)];
            //        fileInfo.size = file.size;
            //        if (!fileInfo.validate()) {
            //            console.log('t');
            //            fs.unlink(file.path);
            //            return;
            //        }
            //        //console.log(file.path + 'upD' + options.uploadDir + '/' + fileInfo.name);
            //        fs.renameSync(file.path, options.uploadDir + '/' + fileInfo.name);

            //        //console.log('renameSync');
            //    })
            //    .on('aborted', function () {
            //        console.log('aborted');
            //        tmpFiles.forEach(function (file) {
            //            fs.unlink(file);
            //        });
            //    })
            //    .on('error', function (e) {
            //        console.log({ "error on event": err, "status": res.status });
            //        res.send({ "error": err, "status": res.status });
            //        res.end();
            //    })
            //    .on('progress', function (bytesReceived, bytesExpected) {

            //        if (bytesReceived > options.maxPostSize) {
            //            res.send({ "progress": "Size of POST request is too large", "status": res.status });
            //            res.end();
            //        }
            //        var percent_complete = (bytesReceived / bytesExpected) * 100;
            //        nPerUp = percent_complete.toFixed(2);
            //        console.log(nPerUp + '%');
            //    })
            //    .on('end', function () {
            //    })
            //    .parse(req, function (err, fields, files) {
            //        if (err) {
            //            console.log({ "parse": err, "status": res.status });
            //            res.send({ "error": err, "status": res.status });
            //            res.end();
            //        } else {
            //            var user = new User();
            //            //user.username = fields.username;
            //            //user.password = fields.password;
            //            //user.email = fields.email;
            //            //user.role = fields.role;
            //            //user.dob = fields.dob;
            //            //user.status = fields.status;
            //            var usrPath = files[0].path;
            //            usrPath = usrPath.replace('SnowWhiteClientApp', '');
            //            usrPath = usrPath.replace(/\\/g, '/');
            //            user = fields;
            //            user.image_path = usrPath;
            //            user.fileInfo = {};
            //            user.fileInfo.type= files[0].type;
            //            user.fileInfo.name= files[0].name;
            //            user.fileInfo.path= files[0].path;
            //            user.fileInfo.size= files[0].size;
                        
                        
            //            User.create(user, function (err, data) {
            //                if (err) {
            //                    res.send({ "error": err, "status": res.status });
            //                }
            //                else {
            //                    res.send({ "data": data });
            //                }
            //                res.end();
            //            });
            //        }

            //    });

        }
        else {
            res.send({ "error": "Please pass parameter for username", "status": -1 });
            res.end();
        }
    }
    catch (err) {
        console.log('catch');
        console.log(err);
        res.send({ "error": err, "status": res.status });
        res.end();
    }
};

exports.DeleteUser = function (req, res, next) {
    try {
        console.log('deleteUser');
        req.params.user_id
        if (req.params.username !== undefined || req.params.username !== '') {
            User.remove({ _id: req.params.user_id }).exec(function (err, result) {
                if (err) {
                    res.send({ "error": err, "status": res.status });
                    res.end();
                }
                else {
                    res.json({ message: 'User deleted!', "status": res.status });
                    res.end();
                }
            });
        }
        else {
            res.send({ "error": "Please pass parameter for user_id", "status": -1 });
            res.end();
        }
    }
    catch (err) {
        res.send({ "error": err, "status": res.status });
        res.end();
    }
};

exports.UpdateUserWithoutImage = function (req, res, next) {
    try {
        console.log('updateUserWithoutImage');

        var now = new Date();
        var payLoad = req.body;
        // save the user and check for errors
        User.findById(req.params.user_id, function (err, doc) {
            if (err) {
                res.send({ "error in find": err, "status": res.status });
                res.end();
            }
            else {
                if (payLoad.email) {
                    doc.email = payLoad.email;
                }
                if (payLoad.dob) {
                    doc.dob = payLoad.dob;
                }
                if (payLoad.status) {
                    doc.status = payLoad.status;
                }
                doc.modified = now; // set the users modified (current timestamp)
                doc.save(
                    function (err, re) {
                        if (err) {
                            res.send({ "error in save": err, "status": res.status });
                            res.end();
                        }
                        else {
                            var message = '';
                            console.log(doc.email);
                            console.log(re.email);
                            if (doc.email == re.email) {
                                message = message + ' No changes in Email Address!! \n';
                            } else {
                                message = message + 'Email Address updated!! \n';
                            }
                            if (doc.dob == re.dob) {
                                message = message + 'No changes in Date Of Birth!! \n';
                            } else {
                                message = message + 'Date Of Birth updated!! \n';
                            }
                            if (doc.status == re.status) {
                                message = message + 'No changes in Status!! \n';
                            } else {
                                message = message + 'Status updated!! \n';
                            }
                                
                            res.send(message);
                            res.end();
                        }
                    });
            }
        });


    }
    catch (err) {
        res.send({ "error": err, "status": res.status });
        res.end();
    }
};

exports.UpdateUserWithImage = function (req, res, next) {
    try {
        console.log('UpdateUserWithImage');
        var username = req.params.username;
       
        var user = new User(); 		// create a new instance of the user model
        var now = new Date();

        if (username !== undefined || username !== '') {

            var nameCountRegexp = /(?:(?: \(([\d]+)\))?(\.[^.]+))?$/,
            nameCountFunc = function (s, index, ext) {
                return ' (' + ((parseInt(index, 10) || 0) + 1) + ')' + (ext || '');
            };
           
            var options = {
                tmpDir: tmpDirPath,
                uploadDir: uploadPath + username,// + '/public/files',                
                maxPostSize: 11000000000, // 11 GB
                minFileSize: 1,
                maxFileSize: 10000000000, // 10 GB
                acceptFileTypes: /.+/i
                // Files not matched by this regular expression force a download dialog,
                // to prevent executing any scripts in the context of the service domain:                

            };
            var FileInfo = function (file) {
                this.name = file.name;
                this.size = file.size;
                this.type = file.type;
            };
            FileInfo.prototype.validate = function () {
                if (options.minFileSize && options.minFileSize > this.size) {
                    this.error = 'File is too small';
                } else if (options.maxFileSize && options.maxFileSize < this.size) {
                    this.error = 'File is too big';
                } else if (!options.acceptFileTypes.test(this.name)) {
                    this.error = 'Filetype not allowed';
                }
                return !this.error;
            };
            FileInfo.prototype.safeName = function () {
                // Prevent directory traversal and creating hidden system files:
                this.name = path.basename(this.name).replace(/^\.+/, '');
                // Prevent overwriting existing files:
                while (_existsSync(options.uploadDir + '/' + this.name)) {
                    console.log('t3');
                    this.name = this.name.replace(nameCountRegexp, nameCountFunc);
                }
            };


            var form = new ObjPF.ProfileForm({ multiples: false, keepExtensions: true }),
                tmpFiles = [],
                files = [],
                map = {};
            form.uploadDir = options.uploadDir;

            form.on('fileBegin', function (name, file) {
                if (file) {
                    console.log('t4');
                    tmpFiles.push(file.path);
                    var fileInfo = new FileInfo(file);
                    fileInfo.safeName();
                    map[path.basename(file.path)] = fileInfo;
                    files.push(fileInfo);
                }


            })
                .on('field', function (name, value) {
                    this.value = decodeURIComponent(value)
                    //console.log(name + ' : ' + decodeURIComponent(value));
                })
                .on('file', function (name, file) {
                    //                    console.log('file');
                    var fileInfo = map[path.basename(file.path)];
                    fileInfo.size = file.size;
                    if (!fileInfo.validate()) {
                        console.log('t');
                        fs.unlink(file.path);
                        return;
                    }
                    //console.log(file.path + 'upD' + options.uploadDir + '/' + fileInfo.name);
                    fs.renameSync(file.path, options.uploadDir + '/' + fileInfo.name);

                    //console.log('renameSync');
                })
                .on('aborted', function () {
                    console.log('aborted');
                    tmpFiles.forEach(function (file) {
                        fs.unlink(file);
                    });
                })
                .on('error', function (e) {
                    console.log({ "error on event": err, "status": res.status });
                    res.send({ "error": err, "status": res.status });
                    res.end();
                })
                .on('progress', function (bytesReceived, bytesExpected) {

                    if (bytesReceived > options.maxPostSize) {
                        res.send({ "progress": "Size of POST request is too large", "status": res.status });
                        res.end();
                    }
                    var percent_complete = (bytesReceived / bytesExpected) * 100;
                    nPerUp = percent_complete.toFixed(2);
                    console.log(nPerUp + '%');
                })
                .on('end', function () {
                })
                .parse(req, function (err, fields, files) {
                    if (err) {
                        console.log({ "parse": err, "status": res.status });
                        res.send({ "error": err, "status": res.status });
                        res.end();
                    } else {
                        
                        User.find({"username":username}, function (err, doc) {
                            console.log({ "doc": doc });
                            if (err) {
                                res.send({ "error in find": err, "status": res.status });
                                res.end();
                            }
                            else {
                                if (fields.email) {
                                    doc.email = fields.email;
                                }
                                if (fields.dob) {
                                    doc.dob = fields.dob;
                                }
                                if (fields.status) {
                                    doc.status = fields.status;
                                }
                                var usrPath = files[0].path;
                                usrPath = usrPath.replace('SnowWhiteClientApp', '');
                                usrPath = usrPath.replace(/\\/g, '/');
                                doc.image_path = usrPath;

                                doc.modified = now; // set the users modified (current timestamp)
                                console.log({ "doc2": doc });
                                User.update({ "username": username }, doc,
                                    function (err, re) {
                                        if (err) {
                                            res.send({ "error in save": err, "status": res.status });
                                            res.end();
                                        }
                                        else {
                                            res.send({ "data": re, "status": res.status });
                                            res.end();
                                        }
                                    });
                            }
                        });
                    }

                });

        }
        else {
            res.send({ "error": "Please pass parameter for username", "status": -1 });
            res.end();
        }
    }
    catch (err) {
        console.log('catch');
        console.log(err);
        res.send({ "error": err, "status": res.status });
        res.end();
    }
};

exports.GetUsers = function (req, res, next) {
    try {
        console.log('GetUsers');
        var query = User.find({});
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

exports.GetUsernames = function (req, res, next) {
    try {
        console.log('findUsers');
        var query = User.find({});
        // this allows you to continue applying modifiers to it
        query.sort('username');
        query.select('username');

        // you can chain them together as well
        // a full list of methods can be found:
        // http://mongoosejs.com/docs/api.html#query-js
        //query.where('age').gt(21);
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

exports.GetProfileInfo = function (req, res, next) {
    try {
        console.log('getProfileInfo');
        console.log(req.params);
        var query = User.find({ "email": req.params.email });
        // this allows you to continue applying modifiers to it
        query.sort('name');
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