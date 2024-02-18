import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function BlogForm({
  handleUpdate,
  handleCancel,
  title,
  type,
  author,
  disabledTrue,
  description,
  setDescription,
  image,
  label,
}) {
  return (
    <div className="w-screen bg-slate-[25] dark:bg-black flex items-center justify-center">
      <form
        className="flex flex-col items-center justify-center  mt-20 md:mx-36 p-14 space-y-10 w-[500px] md:w-full bg-white dark:bg-gray-900 shadow-2xl border border-b-gray-200"
        onSubmit={handleUpdate}
      >
        <div>
          <h1 className="text-3xl text-cyan-600 font-semibold dark:text-white">
            {label == "Save" ? "New" : "Update"} Blog
          </h1>
        </div>
        <div className="space-y-4 flex flex-col items-center justify-center">
          <input
            defaultValue={title || ""}
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            className="bg-gray-100 rounded-lg py-3 px-4 w-full md:w-[550px] placeholder:text-lg placeholder:text-gray-700 focus:outline-none"
          />
          <select
            defaultValue={type || ""}
            name="type"
            id="type"
            className="w-full md:w-[550px] py-3 px-4 bg-gray-100 rounded-lg"
          >
            <option disabled={disabledTrue}>Select Blog Type</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Coding">Coding</option>
            <option value="Finance">Finance</option>
          </select>
          {/* <input
            type="file"
            className="w-full md:w-[550px] px-4 py-3 bg-gray-100 rounded-lg"
          /> */}
          <input
            defaultValue={image || ""}
            type="text"
            id="image"
            name="image"
            placeholder="Image Link :"
            className="bg-gray-100  rounded-lg py-3 px-4 w-full md:w-[550px] placeholder:text-lg placeholder:text-gray-700 focus:outline-none"
          />
          <ReactQuill
            className="md:w-[550px] md:h-[250px]  text-gray-700 text-lg mb-6 dark:text-white"
            theme="snow"
            defaultValue={description}
            onChange={(value) => setDescription(value)}
            preserveWhitespace={true}
          />
          ;
        </div>

        <div className="flex flex-row justify-between md:justify-end md:gap-6 w-full md:w-[550px]">
          <button
            className="px-4 py-2 bg-red-700 rounded-xl text-white focus:outline-none hover:bg-red-500 hover:scale-110 duration-150 transition"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-400 rounded-xl text-white focus:outline-none hover:bg-gray-500 hover:scale-110 duration-150 transition">
            {label == "Save" ? "Save" : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default BlogForm;
