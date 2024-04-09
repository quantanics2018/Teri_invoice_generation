const invoicecontent = {
    padding: '1rem',
    height: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
}
const InvoiceHead = {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'darkblue',
    color: 'white',
    padding: '1rem'
}
const invoiceImg = {
    // width: 'calc(100% - 1rem)',
    // height: 'calc(100%-1rem)',
    // position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
}
const invoicepic = {
    height: '100px',
}
const invoiceHead = {
    backgroundColor: 'darkblue',

}
const paymentDetials = {
    // display: 'flex',
    width: '100%',
    height: 'auto',
    justifyContent:'space-between',
    border:'1px solid',
    borderTop: 'none',
}
const bankDetails = {
    width: '100%',
    alignItems:'center',
    justifyContent:'end'
}
const th = {
    border: '1px solid black',
    padding: '0.5rem',
    borderWidth: '1px',
    color: 'white',
    display:'flex',
    flexGrow: '1',
}
const td = {
    border: '1px solid black',
    padding: '0.5rem',
    borderWidth: '1px',
    display:'flex',
    flexGrow: '1',
}
const paymentQrSession = {
    border: '1px solid',
    width: '40%',
}
const detialAboutPayment = {
    border: '1px solid',
    width: '100%',
}
const invoiceRow = {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'space-between',
    padding:'0.5rem'
}
const even = {
    color: 'darkblue'
}

const odd = {
    backgroundColor: 'darkblue',
    color: 'white',
    /* Lighter gray for odd rows */
}
const bussinessQuotes = {
    width: '100%',
    backgroundColor: 'darkblue',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}
const listData = {
    listStyle: 'none',
    margin: 0,
    padding: 0,
}

const billTo = {
    width: '40%',
    borderRight:'1px solid',
    // height:'450px'
    // border: '0px 1px 0px 0px solid',

}
const invoiceNo = {
    width: '55%',
    height: '100%',
}
const addressDetials ={
    borderBottom: '1px solid',
    width:'100%',
    display:'flex !important',
    flexGrow: '1',
    // flexDirection:'column',
    justifyContent: 'space-between',
}
const table = {
    flexGrow: '1',
    width:'100%',
    borderCollapse: 'collapse',
    height: '100%',

    border: '1px solid #000',
}
const shipTo = {
    width: '33.25%'
}

const tbody = {
    border: '1px solid #000',

}
const tBorder = {
    border: '1px solid #000',
    display:'flex',
}
const tBorderd = {
    border: '1px solid #000',
    // display:'flex',
    width:'50%'
}
const rawInput = {
    outline: 'none',
    // border: 'none',
    // width: '-webkit-fill-available',
    width: '110px',
    // height: '-webkit-fill-available',

    // borderBottom: '1px solid #ccc',
    // borderColor: 'dodgerblue',
    // boxShadow: '0 0 5px dodgerblue',
}
const reciverBill ={
    marginBottom:'0',
}
const textwarp = {
    overflow: 'hidden',
    textWrap: 'balance',
}
const tdh = {
    whiteSpace: 'nowrap',
}
const tdv = {
    width:'100px',
    fontWeight:'700'
}
const tdvDate = {
    width:'100px',
    fontWeight:'700'

}
const textarea ={
    width:'100%',
    outline: 'none',
    border: 'none',
    height:'66px'
}
const bussinessContent={
    fontWeight:'600',
    color:'white',
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
}
const billDetial ={
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'space-between',
    border: '1px solid',
    // padding: '1rem',
}
const tandc ={
    whiteSpace:'nowrap'
}
const nowrap ={
    whiteSpace:'nowrap'

}
const taxInvoiceHead ={
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
}
const invoiceDetial = {
    // margin:'1rem',
    padding:'1rem',
    borderBottom: '1px solid',
}
const df ={
    display:'flex',
}
const dfc ={
    display:'flex',
    flexDirection:'column',
}
const gap ={
    gap:'3px',
}
const gap1 ={
    gap:'1px',
}
const invoicedetail = {
    width:'60%'

}
const rowInvoiceDetail={
    borderBottom: '1px solid',
    // padding:'1rem'
    // margin:'1px'
}
const inputbox ={
    outline: 'none',
    border: 'none',
    // width:'20px',
}
const row1Invoice ={
    borderRight:'1px solid',
}
const width50 = {
    width:'50%'
}
const pad ={
    padding:'1rem',
}
const padInPx ={
    padding:'3px',
}
const mt = {
    marginTop:'4rem'
}
const sb ={
    justifyContent:'space-between'
}

/* table start */
const table1 = {
    display: 'table',
    width: '100%',
    borderCollapse: 'collapse',
}
const row = {
    display: 'table-column',
}
// .cell {
//     display: table-cell;
//     border: 1px solid black;
//     padding: 10px;
// }
export { invoicecontent, InvoiceHead, invoiceImg, invoicepic, invoiceHead, paymentDetials, th, td, paymentQrSession, detialAboutPayment, invoiceRow, even, odd, bussinessQuotes, listData, billTo, invoiceNo, shipTo, table , tbody,tBorder,rawInput,tdv,tdvDate,textarea,billDetial,bankDetails,tdh,tBorderd,tandc,nowrap,taxInvoiceHead,invoiceDetial,df,gap, gap1,dfc,addressDetials,invoicedetail,rowInvoiceDetail,inputbox,row1Invoice,width50,reciverBill,pad,textwarp,padInPx,bussinessContent,mt,sb,table1,row};