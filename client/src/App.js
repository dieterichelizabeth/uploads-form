import React, { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import Swal from "sweetalert2";
import "./App.css";
import { postFile, getFile, getDoc } from "./fetch";

const fileTypes = ["JPG", "PNG", "PDF"];

function App() {
  // const [file, setFile] = useState();
  const [isLoading, setLoading] = useState(true);
  const [imageSourceUrl, setImageSourceUrl] = useState("");
  const [hrefURL, sethrefURL] = useState("");

  // Run Query Once
  useEffect(() => {
    // Get an image from the server
    // https://stackoverflow.com/questions/50248329/fetch-image-from-api
    getFile()
      .then((response) => {
        response.blob().then((data) => {
          setImageSourceUrl(URL.createObjectURL(data));
          setLoading(false);
        });
      })
      .catch((err) => {
        console.log(err);
      });

    // Get a file from the server
    // https://stackoverflow.com/questions/55963990/how-can-i-download-a-pdf-from-a-url-using-javascript
    // getDoc()
    //   .then((response) => {
    //     response.blob().then((data) => {
    //       sethrefURL(URL.createObjectURL(data));
    //       setLoading(false);
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  // Swal messages
  const confirm = {
    title: "Confirm Upload",
    text: "",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#1c4d7c",
    cancelButtonColor: "#ced1d6",
    confirmButtonText: "Yes",
  };
  const success = {
    title: "Upload Success!",
    text: "",
    icon: "success",
  };
  const error = {
    icon: "error",
    title: "Oops...",
    text: "Something went wrong!",
  };

  const handleChange = async (newFile) => {
    // Format File for fetch request
    const formData = new FormData();
    formData.append("file", newFile);

    confirm.text = `Upload file: ${newFile.name} ?`;
    success.text = `Succesfully uploaded file: ${newFile.name}`;

    // Confirm upload
    Swal.fire(confirm).then((result) => {
      if (result.isConfirmed) {
        postFile(formData)
          .then((data) => {
            Swal.fire(success).then(() => {
              window.location.reload();
            });
          })
          .catch((err) => {
            Swal.fire(error);
          });
      } else {
        window.location.reload();
      }
    });
  };

  if (isLoading) {
    return <div className="placeholder">Loading...</div>;
  }

  return (
    <div className="App">
      <h1>Drag and Drop to upload</h1>

      <form className="uploads-form" encType="multipart/form-data">
        {/* react-drag-drop-files npm input */}
        <FileUploader
          handleChange={handleChange}
          name="file"
          types={fileTypes}
          classes="test-input"
          label="Upload or Drop Files Here or click below to Upload."
        />
      </form>

      <a href={hrefURL} target="_blank" rel="noreferrer">
        Download PDF
      </a>

      <img src={imageSourceUrl} alt="hopefully the icon..."></img>
    </div>
  );
}

export default App;
