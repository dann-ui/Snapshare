const API_URL = "https://api-snapshare.azurewebsites.net";

async function uploadImage() {
  const file = document.getElementById("imageFile").files[0];
  const title = document.getElementById("title").value;
  const caption = document.getElementById("caption").value;
  const location = document.getElementById("location").value;

  const formData = new FormData();
  formData.append("image", file);
  formData.append("title", title);
  formData.append("caption", caption);
  formData.append("location", location);

  const response = await fetch(API_URL + "/upload", {
    method: "POST",
    body: formData
  });

  document.getElementById("status").innerText =
    response.ok ? "Upload successful!" : "Upload failed.";
}

async function loadImages() {
  const response = await fetch(API_URL + "/images");
  const images = await response.json();

  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";

  images.forEach(img => {
    gallery.innerHTML += `
      <div>
        <img src="${img.url}" width="200"><br>
        <strong>${img.title}</strong><br>
        ${img.caption}
      </div><hr>
    `;
  });
}
