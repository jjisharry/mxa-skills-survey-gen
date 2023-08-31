/**
 * Places file for given item into given folder.
 * @param {Object}  item     Any object that has an ID and is also a Drive File.
 * @param {Folder}  folder   Google Drive Folder object.
 */
function saveItemInFolder(item,folder) {
  var id = item.getId();  
  folder.addFile(DriveApp.getFileById(id));
}