const imagesJsonUrl = 'http://10.114.32.14/node/images/images.json';
const form = document.getElementById('uploadForm');
const imageList = document.getElementById('image-list');

const showUploadedImage = (imgUrl) => {
	console.log('updating')
	const imgContainer = document.getElementById('uploadedImage');
	imgContainer.src = imgUrl;
	
}

const newListItem = (url) => {
	const img = document.createElement("img");
	img.setAttribute("src", url);
	
	const a = document.createElement("a");
	a.setAttribute("href", url);
	a.appendChild(img);

	const li = document.createElement("li");
	li.appendChild(a);

	return li;
}

const showImage = (url) => {
	imageList.insertBefore( newListItem(url), imageList.childNodes[0] );
}

// Fetch images stored on server.
fetch(imagesJsonUrl)
	.then( res => {
		return res.json();
	})
	.then( data => {
		data.forEach(element => {
			showImage(element.imgUrl);
		});
	})
	.catch( err => {
		console.log(err);
	});

	
form.addEventListener('submit', (e) => {
	e.preventDefault();
	
	console.log("uploading to server...");
	const fileInput = document.querySelector('input[type="file"]');
	
	const data = new FormData();
	data.append('newfile', fileInput.files[0]);
	console.log(data);
	const settings = {
		method: 'POST',
		body: data
	};
	
	fetch('http://10.114.32.14/node/file-upload/new-file', settings)
	.then( res => {
		return res.text();
	})
	.then( url => {
		showImage(url);
		console.log(`Uploaded image to url: ${url}`);
	});
	
});
