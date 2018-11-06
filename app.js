'use strict';

const fs = require('fs');
const multiparty = require('multiparty');
const express = require('express');
const app = express();
const port = 8000;

const isEmpty = (obj) => {
	return (Object.keys(obj).length === 0 && obj.constructor === Object);
}
const newImageJson = (url) => {
	return {"imgUrl": url}
}

let imagesJson = JSON.parse(fs.readFileSync(__dirname+'/public/images/images.json', 'utf-8'));


app.use(express.static('public'));

app.post('/file-upload/new-file', (req, res) => {
	
	let form = new multiparty.Form();
	
	form.parse(req, (err, fields, files) => {
		if (isEmpty(files)) {
			return;
		}
		let newImage = files.newfile[0];
		let filename = newImage.originalFilename;
		let oldpath = newImage.path;
		let newpath = __dirname+'/public/images/'+filename;
		let newImageUrl = 'http://10.114.32.14/node/images/'+filename;
		fs.rename(oldpath, newpath, (err) => {
			if (err) {
				res.send(err);
			}
			imagesJson.push(newImageJson(newImageUrl));
			let data = JSON.stringify(imagesJson, null, 2);
			fs.writeFileSync(__dirname+'/public/images/images.json', data);
			res.send(newImageUrl);
		});
	});
	
});

app.listen( port, () => console.log(`Server running on port ${port}...`));