import axios from "axios";
import { useEffect, useState } from "react";

const QrCode = ({totalSum}) => {
    const [imageSrc, setImageSrc] = useState('');

    const fetchImage = async () => {
        try {
            console.log(totalSum);
            const response = await axios.post('http://localhost:4000/send-email/generateQR',{totalSum:totalSum});
            // console.log(response.data);
            setImageSrc(response.data); // Replace 'image_url' with the actual property name
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    };
    useEffect(() => {
        fetchImage();
    }, [totalSum]);
    return (
        <>
            <img src={imageSrc} alt="Qr Scanner" />
        </>
    )
}
export default QrCode;