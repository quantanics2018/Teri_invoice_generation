import axios from "axios";
import { useEffect, useState } from "react";

const QrCode = () => {
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.post('http://localhost:4000/send-email/generateQR');
                // console.log(response.data);
                setImageSrc(response.data); // Replace 'image_url' with the actual property name
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        fetchImage();
    }, []);
    return (
        <>
            <img src={imageSrc} alt="Qr Scanner" />
        </>
    )
}
export default QrCode;