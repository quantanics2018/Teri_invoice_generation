import zIndex from "@mui/material/styles/zIndex";
// import CircularProgressWithLabel from '@mui/material/CircularProgress';
import { Box, CircularProgress, LinearProgress, Skeleton } from "@mui/material";

// const { CircularProgress } = require("@mui/material");

const Loader = () => {
    return (
        <div className='loading_page1'>
            <CircularProgress style={{ position: 'relative', zIndex: 6 }} />
            {/* <Box sx={{ width: 300 }}>
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
            </Box> */}
            {/* <CircularProgressWithLabel value={LinearProgress} /> */}
            {/* <img src={loading} alt="loading image" className='truck_img' /> */}
            {/* <div className="loading_text"> Loading...</div> */}
        </div>
    );
}

export default Loader;
