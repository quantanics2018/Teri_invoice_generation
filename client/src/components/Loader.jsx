import zIndex from "@mui/material/styles/zIndex";

const { CircularProgress } = require("@mui/material");

const Loader = () => {
    return (
        <div className='loading_page1'>
            <CircularProgress style={{ position: 'relative', zIndex: 6 }} />
            {/* <img src={loading} alt="loading image" className='truck_img' /> */}
            {/* <div className="loading_text"> Loading...</div> */}
        </div>
    );
}

export default Loader;