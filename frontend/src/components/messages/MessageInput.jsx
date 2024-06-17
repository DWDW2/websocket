import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import { GoUpload } from "react-icons/go";

const MessageInput = () => {
    const [message, setMessage] = useState("");
    const { loading, sendMessage } = useSendMessage();
    const [file, setFile] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message) return;
        await sendMessage(message);
        setMessage("");
    };

    const handleFileUpload = () => {
        setFile(true);
    };

    const handleFileChange = async (e) => {
        const uploadedFile = e.target.files[0];
        if (uploadedFile) {
            // Handle the file upload logic here
            console.log("File uploaded:", uploadedFile);
            setFile(false);
			const formData = new FormData();
			formData.append('file', file);
			try {
				await axios.post('http://localhost:5000/upload', formData, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				});
				alert('File uploaded successfully');
			} catch (error) {
				console.error('Error uploading file:', error);
				alert('Failed to upload file');
			}
        }
    };

    return (
        <div>
            {file && (
                <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
                    </label>
                </div>
            )}
            <form className="px-4 my-3" onSubmit={handleSubmit}>
                <div className="w-full relative flex justify-between">
                    <input
                        type="text"
                        className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
                        placeholder=""
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3">
                        {loading ? <div className="loading loading-spinner"></div> : <BsSend />}
                    </button>
                    {!message && (
                        <GoUpload onClick={handleFileUpload} className="absolute mt-3 mb-3 ml-3 cursor-pointer" />
                    )}
                </div>
            </form>
        </div>
    );
};

export default MessageInput;
