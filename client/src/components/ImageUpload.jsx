import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    console.log(file);
    const handleUpload = async () => {
        // Ensure a file is selected
        if (!file) {
            alert('Please select an image to upload');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);
        formData.append('type', 'single');
        // for (const entry of formData.entries()) {
        //     console.log(entry);
        // }
        try {
            const response = await axios.post('http://localhost:4000/upload',
                //  {hai:formData, type:'single'}
                 formData
            );

            if (response.status === 200) {
                console.log('File uploaded successfully:', response.data);
            } else {
                console.error('Failed to upload file:', response.statusText);
            }
        } catch (error) {
            console.error('Error uploading image:', error.message);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Image</button>
        </div>
    );
};

export default ImageUpload;
