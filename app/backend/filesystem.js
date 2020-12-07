const drivelist = require('drivelist');
const path = require("path");
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
                fs.chmodSync(path, 0o333);
                fs.rmdirSync(path);
            } else {
                return "Folder must be empty to be deleted.";
            }
        } else {
            fs.chmodSync(path, 0o333);
            fs.rmSync(path);
        }
        return getFiles(originalPath);
    } catch(err) {
        console.log(err);
        return "An unexpected error occured.";
    }
}

async function getDrives() {
    let hddList = []
    const drives = await drivelist.list();
    console.log(drives);
    drives.forEach((drive) => {
        //console.log(drive);
        //console.log(drive.description);
        //console.log(drive.isSystem);
        //console.log(drive.mountpoints[0].path)
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
                let birthtime = stats.birthtime.getMonth + "/" + stats.birthtime.getDay + "/" + stats.birthtime.getFullYear;
                if (!stats.isDirectory()) {
                    console.log("FOUND A FILE!!");
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
                    files.push({name: file, isFolder: false, birth: birthtime, size: fsize});
                } else {
                    files.push({name: file, isFolder: true, birth: birthtime});
                }
            }
        } catch(err) {
            console.log("Cannot get file stats: " + file);
        }
    }
    return files;
}

exports.createFolder = createFolder;
exports.renameFile = renameFile;
exports.deleteFile = deleteFile;
exports.getDrives = getDrives;
exports.getFiles = getFiles;
