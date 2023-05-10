import React from "react";
import { FileUploader } from "react-drag-drop-files";
import Swal from "sweetalert2";
import "./App.css";
import { postFile } from "./fetch";

const fileTypes = ["JPG", "PNG", "PDF"];

function App() {
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
    </div>
  );
}

export default App;
