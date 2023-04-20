const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Endpoint to create a text file with the current timestamp as content
app.get('/createFile', (req, res) => {
  const folderPath = './Files'; // Replace with actual folder path
  const filename = `${new Date().toISOString().replace(/:/g, '-')}.txt`;
  const filePath = path.join(folderPath, filename);
  const content = new Date().toString();

  fs.writeFile(filePath, content, err => {
    if (err) {
      console.error(err);
      return res.status(500).send('Failed to create file');
    }

    res.send('File created successfully');
  });
});

// Endpoint to retrieve all text files in a folder
app.get('/getAllFiles', (req, res) => {
    const folderPath = './Files'; // Replace with actual folder path
  
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Failed to retrieve files');
      }
  
      const textFiles = files.filter(file => {
        const fileExtension = path.extname(file);
        return fileExtension === '.txt';
      });
  
      const fileContents = [];
  
      textFiles.forEach(file => {
        const filePath = path.join(folderPath, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        fileContents.push({ filename: file, content });
      });
  
      res.send(fileContents);
    });
  });
  

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
