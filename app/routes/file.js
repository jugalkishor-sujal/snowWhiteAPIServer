var File = require('../models/file');
var ObjPF = require("./fileUploader/ProfileForm");
exports.findFiles = function (req, res, next) {
    try {
        var query = File.find({ "name": req.params.name });
        query.sort('title');
        query.exec(function (err, result) {
            if (err) return next(err);
            res.send(result);
            res.end();
        });
    } catch (err) {
        res.send(err);
        res.end();
    }

};
function upload_file(req, res, upload_path) {
    var done_upload = 0;
    var form = new ObjPF.ProfileForm({ uploadDir: upload_path, multiples: true, keepExtensions: true });
    form.parse(req, function (err, fields, files) {

        if (err)
        { res.send(err); res.end(); }
        else
        {
        files.forEach(function (fileUploaded) {
            var fileDbObj = new File(); 		// create a new instance of the user model
            var now = new Date();
            var payLoad = req.params;
            fileDbObj.name = payLoad.name;  // set the files name (comes from the request)
            //file.email = payLoad.email;  // set the files email (comes from the request) 
            fileDbObj.title = fileUploaded.name; // set the files title (comes from the request)    

            fileUploaded.path = fileUploaded.path.replace('SnowWhiteClientApp', '');
            fileUploaded.path = fileUploaded.path.replace(/\\/g, '/');
            console.log(fileUploaded.path);
            fileDbObj.path = fileUploaded.path;  // set the files path (comes from the request)        
            console.log(fileDbObj.path);
            fileDbObj.short_desc = fileUploaded.lastModifiedDate;   // set the files short_desc (comes from the request)
            fileDbObj.file_size = fileUploaded.size;// set the files file_size (comes from the request)
            fileDbObj.type = fileUploaded.type;// set the files type (comes from the request)
            // save the user and check for errors
            File.create(fileDbObj, function (err, doc) {
                if (err) return next(err);
                done_upload = 1;

                //router = server

                //var socket = zmq.socket('router');

                //socket.identity = 'server' + process.pid;

                //socket.connect(port);
                //console.log('connected!');

                //socket.on('message', function (envelope, data) {
                //    console.log(socket.identity + ': received ' + envelope + ' - ' + data.toString());
                //    socket.send([envelope, data * 2]);
                //});

            });

        });
        res.send({ "success": done_upload, "status": res.status });
        res.end();
        
    }   
    });
}
exports.addFile = function (req, res, next) {
    try {
        var fs = require('fs');
        var result = 0;
        console.log("addFile Call");
        var upload_path='SnowWhiteClientApp/assets/uploads/' + req.params.name;
        fs.exists(upload_path, function (exists) {
            if (exists) {
                upload_file(req, res, upload_path);
            }
            else {
                fs.mkdir(upload_path, [777], function (exists) {
                    upload_file(req, res, upload_path);
                });
            }
        });
       
        
        
        
    }
    catch (err) {
        console.log(err);
        res.send({ "error": err, "status": res.status });
        res.end();
    }
};

exports.deleteFile = function (req, res, next) {
    try {
        File.remove({ _id: req.params.file_id }).exec(function (err, result) {
            if (err)
            { res.send(err); }
            else
            {
                res.json({ message: 'File deleted!' });
                res.end();              
            }
        });
    }
    catch (err) {
        res.send({ "error": err, "status": res.status });
        res.end();
    }
};
exports.updateFile = function (req, res, next) {
    try {
        console.log('addFile');
        var user = new File(); 		// create a new instance of the user model
        var now = new Date();
        var payLoad = req.body;
        file.name = payLoad.name;  // set the files name (comes from the request)
        file.path = payLoad.path;  // set the files path (comes from the request)	
        file.title = payLoad.title; // set the files title (comes from the request)	
        file.email = payLoad.email;  // set the files email (comes from the request)    
        file.short_desc = payLoad.short_desc;   // set the files short_desc (comes from the request)
        file.file_size = payLoad.file_size;// set the files file_size (comes from the request)
        if (payLoad.name) {
            file.name = payLoad.name;  // set the users name (comes from the request)
        }
        if (payLoad.path) {
            file.path = payLoad.path;  // set the users password (comes from the request)	
        }
        if (payLoad.title) {
            file.title = payLoad.title; // set the users role (comes from the request)	
            }
            if (payLoad.email) {
                file.email = payLoad.email;  // set the users email (comes from the request)    
            }
            if (payLoad.short_desc) {
                file.short_desc = payLoad.short_desc;  // set the users name (comes from the request)
            }
            if (payLoad.file_size) {
                file.file_size = payLoad.file_size;  // set the users name (comes from the request)
            }
            file.modified = now;   // set the users modified (current timestamp)
        // save the user and check for errors
            file.update({ _id: req.params.file_id }, function (err, doc) {
            if (err) return next(err);
            res.json({ message: 'File updated!' });

            res.end();
        });

    }
    catch (err) {
        res.send({ "error": err, "status": res.status });
        res.end();
    }
};

