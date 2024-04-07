import Image from "next/image";
import toast from "react-hot-toast";

const EditableImage = ({ link, setLink }) => {

  async function handleFileChange(ev) {
    const files = ev.target.files;
    if (files?.length === 1) {
      const data = new FormData;
      data.set("file", files[0]);
      
      const uploadPromise = fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then(response => {
        if(response.ok){
          return response.json().then(link => {
            setLink(link)
          })
        }
        throw new Error("Something went wrong")
      })

      await toast.promise(uploadPromise, {
        loading: "Uploading...",
        success: "Upload complete",
        error: "Upload error",
      })
    }
  }

  return (
    <>
      {link && (
       
          <Image
            className="rounded-lg w-full h-full mb-1 shadow-lg"
            src={link || "/istockphoto-1300845620-612x612.jpg"}
            alt="avatar"
            width={250}
            height={250}
          />
           )}
           {!link && (
            <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">No image</div>
           )}
          <label>
            <input type="file" className="hidden" onChange={handleFileChange} />
            <span
              className="block border border-gray-300 rounded-lg p-1  
                  text-center cursor-pointer"
            >
              Change Image
            </span>
          </label>
     
     
    </>
  );
};

export default EditableImage;
