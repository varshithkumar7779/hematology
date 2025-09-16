import React, { useState } from 'react';
import axios from 'axios';

const Checkdl = () => {
    const [image, setImage] = useState(null);
    const [dlRes, setDlRes] = useState(null); // store JSON, not just string
    const [displayImage, setDisplayImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const selectedImage = event.target.files[0];
            setImage(selectedImage);
            setDisplayImage(URL.createObjectURL(selectedImage));
        }
    };

    const submitImage = async (e) => {
        e.preventDefault();
        
        if (!image) {
            alert('Please select an image first');
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("image", image);

        try {
            const response = await axios.post(
                "http://localhost:8000/upload-image",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            // Store the backend response (label + confidences)
            setDlRes(response.data);

        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Error processing image");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1>Image Prediction with Deep Learning</h1>
            <div className='dl'>
                <form onSubmit={submitImage} className='dl_1'>
                    <input 
                        type='file'
                        className='file'
                        accept='image/*'
                        onChange={onImageChange}
                    />
                    <button 
                        type='submit' 
                        className='btn_2'
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : 'Submit'}
                    </button>
                </form>
            </div>
            
            {displayImage && (
                <div className='img-preview'>
                    <h2>Image Preview:</h2>
                    <img 
                        src={displayImage} 
                        alt="preview" 
                        style={{ maxWidth: '300px', maxHeight: '300px' }}
                    />
                </div>
            )}
            
            {dlRes && (
                <div className='result'>
                    <h2>Prediction Result:</h2>
                    <p><b>Most likely:</b> {dlRes.label}</p>

                    <h3>Confidence Scores:</h3>
                    <ul>
                        {dlRes.confidences.map((conf, idx) => (
                            <li key={idx}>
                                {conf.label}: {(conf.confidence * 100).toFixed(2)}%
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Checkdl;
