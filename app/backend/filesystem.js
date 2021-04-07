const drivelist = require('drivelist');
const child_process = require("child_process")
const fs = require("fs");

function createFolder(filePath, folderName) {
    let path = filePath;
    let originalPath = path.join('/');
    path.push(folderName);
    let fp = filePath.join('/');
    try {
        if (!fs.existsSync(fp)) {
            fs.mkdirSync(fp);
            return getFiles(originalPath);
        } else {
            return "That folder name already exists.";
        }
    } catch(err) {
        return "An unexpected error occured.";
    }
}

function compressFiles(filePath, folder, zipFilePath) {
    let zipCommand = "pushd " + filePath + " && zip -r " + zipFilePath + " ./" + folder + "/ && popd";
    console.log("Zipping with command: " + zipCommand);
    try {
        child_process.execSync(zipCommand, {shell: '/bin/bash'});
    } catch (error) {
        console.log("ERROR ZIPPING FILE: " + error);
        return false;
    }
    return true;
}

function renameFile(filePath, newFilePath, oldName, newName) {
    let originalPath = newFilePath.join('/');
    let oldPath = filePath.concat(oldName).join('/');
    let newPath = filePath.concat(newName).join('/');
    try {
        if (!fs.existsSync(newPath)) {
            fs.renameSync(oldPath, newPath);
            return getFiles(originalPath);
        } else {
            return "That file name already exists.";
        }
    } catch(err) {
        console.log(err);
        return "An unexpected error occured.";
    }
}

function deleteFile(filePath, fileName, isFolder) {
    console.log(typeof isFolder);
    let originalPath = filePath.join('/');
    let path = filePath.concat(fileName).join('/');
    try {
        if (isFolder === "true") {
            console.log(isFolder);
            if (getFiles(path).length === 0) {
                try {
                    fs.chmodSync(path, 0o333);
                } catch(err) {
                    console.log("EPERM: Could not run chmod.")
                }
                fs.rmdirSync(path);
            } else {
                return "Folder must be empty to be deleted.";
            }
        } else {
            try {
                fs.chmodSync(path, 0o333);
            } catch(err) {
                console.log("EPERM: Could not run chmod.")
            }
            fs.unlinkSync(path);
        }
        return getFiles(originalPath);
    } catch(err) {
        console.log(err);
        return "An unexpected error occured.";
    }
}

function moveFile(oldFilePath, newFilePath, currFilePath) {
    try {
        if (!fs.existsSync(newFilePath)) {
            fs.renameSync(oldFilePath, newFilePath);
            return getFiles(currFilePath);
        } else {
            return "That file already exists at that location.";
        }
    } catch(err) {
        if (err.code === "EXDEV") {
          let inStream = fs.createReadStream(oldFilePath);
          let outStream = fs.createWriteStream(newFilePath);
          inStream.pipe(outStream);
          inStream.on('end', function() {
            fs.unlinkSync(oldFilePath);
          });
          return getFiles(currFilePath);
        } else {
          console.log(err);
          return "An unexpected error occured.";
        }
    }
}

async function getDrives() {
    let hddList = []
    const drives = await drivelist.list();
    console.log(drives);
    drives.forEach((drive) => {
        // Use this loop to use only external drives
        if (!drive.isSystem && (drive.isUSB || drive.isUAS)) {
            hddList.push({name: drive.mountpoints[0].path, isFolder: true});
        }
        // Use this statement to use all drives
        // WARNING: THIS WILL ALLOW YOU TO DO THINGS THAT CAN BREAK YOUR COMPUTER,
        //          SUCH AS DELETING THE SYSTEM32 FOLDER. MAKE SURE YOU KNOW WHAT YOU
        //          ARE DOING IF YOU WANT TO USE THIS OPTION AND BE CAREFUL!!
        //          THE DEVELOPERS ARE NOT RESPONSIBLE FOR ANY DAMAGE OR LOSS OF DATA
        //          FROM USING THIS OPTION!
        //hddList.push({name: drive.mountpoints[0].path, isFolder: true});
    });
    return hddList;
};

function getFiles(directoryPath) {
    let files = [];
    console.log(directoryPath);
    let fileNames = fs.readdirSync(directoryPath);
    console.log(fileNames);
    let filePath;
    let file;
    let stats;
    for (let i = 0; i < fileNames.length; i++) {
        file = fileNames[i];
        filePath = directoryPath + `/${file}`;
        try {
            stats = fs.statSync(filePath);
            if (typeof stats !== "undefined") {
                // Get the last modified time, and convert it to a string, necessary for converting to correct timezone.
                let modDate = stats.mtime.toString().split(" ");
                // Set the month number
                let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(modDate[1]) + 1;
                // Set the day and year
                let day = modDate[2];
                let year = modDate[3];
                // Get the time and split it into hours, minutes, and seconds
                let modTime = modDate[4].split(":");
                let hours;
                let period;
                // Conver from 24 hour clock to 12 hour with AM/PM
                if (parseInt(modTime[0]) > 12) {
                    hours = parseInt(modTime[0]) - 12;
                    period = "PM";
                } else {
                    if (parseInt(modTime[0]) === 0) {
                        hours = 12;
                    }
                    else {
                        hours = modTime[0];
                    }
                    period = "AM";
                }
                let minutes = modTime[1];
                // Create mod time string to be returned
                let modDateTime = month + "/" + day + "/" + year + "     " + hours + ":" + minutes + period;
                // Convert file size data to bytes/kilobytes/megabytes/gigabytes
                // Note: sizes may appear different than in on system file explorer if it uses kibi/mibi/gibibytes!
                if (!stats.isDirectory()) {
                    let fsize;
                    if (stats.size < 1024) {
                        fsize = stats.size + " B";
                    } else if (stats.size < (1024*1024)) {
                        fsize = (Math.round(stats.size/1024*100)/100) + " KB";
                    } else if (stats.size < (1024*1024*1024)) {
                        fsize = (Math.round(stats.size/(1024*1024)*100)/100) + " MB";
                    } else {
                        fsize = (Math.round(stats.size/(1024*1024*1024)*100)/100) + " GB";
                    }
                    files.push({name: file, isFolder: false, lastMod: modDateTime, size: fsize});
                } else {
                    files.push({name: file, isFolder: true, lastMod: modDateTime});
                }
            }
        } catch(err) {
            console.log("Cannot get file stats: " + file);
        }
    }
    return files;
}

function getModules() {
    let mods = [];
    let modsPath = __dirname + "/../src/modules"
    let files = fs.readdirSync(modsPath);
    for (let i = 0; i < files.length; i++) {
        if (!mods.includes(files[i])) {
            modes.push(files[i]);
        }
    }
    return mods;
}

exports.createFolder = createFolder;
exports.compressFiles = compressFiles;
exports.renameFile = renameFile;
exports.deleteFile = deleteFile;
exports.moveFile = moveFile;
exports.getDrives = getDrives;
exports.getFiles = getFiles;
exports.getModules = getModules;
