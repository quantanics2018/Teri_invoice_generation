import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../config/config";

const QrCode = ({totalSum,upi}) => {
    const [imageSrc, setImageSrc] = useState('');

    const fetchImage = async () => {
        try {
            // console.log(totalSum);
            const response = await axios.post(`${API_URL}send-email/generateQR`,{totalSum:totalSum,upi:upi});
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
            <img src={imageSrc} alt="Qr Scanner" height={100} width={100}/>
        </>
    )
}
export default QrCode;