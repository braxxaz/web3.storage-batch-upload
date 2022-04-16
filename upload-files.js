import process from 'process'
import minimist from 'minimist'
import { Web3Storage, getFilesFromPath } from 'web3.storage'
import fs from 'fs'
import path from 'path'

async function upload (filename,filepath) {
 
  const token = "Put your API Token Here"

  if (!token) {
    return console.error('A token is needed. You can create one on https://web3.storage')
  }

  //if (filepath.length < 1) {
    //return console.error('Please supply the path to a file or directory')
 // }

  const storage = new Web3Storage({ token })
  const files = []

  //for (const path of filepath) {
  //  const pathFiles = await getFilesFromPath(path)
  //  files.push(...pathFiles)
  //}
  
  console.log("This is the filepath: " + filepath)
  console.log("This is the filename: " + filename)
  //files.push(...filepath + filename)

  var singlefile = filepath + filename

  //for (const path of filepath) {
    const pathFiles = await getFilesFromPath(singlefile)
    files.push(...pathFiles)
  //}


 // files.push(singlefile)
  console.log("These are all the files in the array: " + files)

  //console.log(`Uploading ${files.length} files`)
  console.log("Uploading " + singlefile)
  //console.log(`Uploading ${singlefile.length} files`)

  const cid = await storage.put(files, { name: filename})
  console.log('Content added with CID:', cid)
}


async function getfilesfirst(directory){

  console.log("main path: " + directory)
  //requiring path and fs modules
//const path = require('path');

//joining path of directory 
//const directoryPath = path.join(__dirname, 'Documents');
const directoryPath = directory;

//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, allfiles) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err)
    } 
    //listing all files using forEach
    allfiles.forEach(function (file) {
        // Do whatever you want to do with the file
        console.log("do first filename: " + file)
        console.log("do first filepath: " + directory + file)
        upload(file,directory)
    })

  
})

}

getfilesfirst(process.argv[2])