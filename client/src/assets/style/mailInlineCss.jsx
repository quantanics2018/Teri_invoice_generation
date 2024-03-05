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
    width: 'calc(100% - 1rem)',
    height: 'calc(100%-1rem)',
    position: 'absolute',
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
    display: 'flex',
    width: '100%',
    height: 'auto',
}
const th = {
    border: '1px solid black',
    padding: '0.5rem',
    borderWidth: '1px',
    color: 'white'
}
const td = {
    border: '1px solid black',
    padding: '0.5rem',
    borderWidth: '1px',
}
const paymentQrSession = {
    border: '1px solid',
    width: '40%',
}
const detialAboutPayment = {
    border: '1px solid',
    width: '60%',
}
const invoiceRow = {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'space-between',
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
    width: '35.25%'
}
const invoiceNo = {
    width: '50.25%',
    height: '100%'

    // display: 'flex',
    // flexDirection: 'column',
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
}
const rawInput = {
    outline: 'none',
    border: 'none',
    borderBottom: '1px solid #ccc',
    // borderColor: 'dodgerblue',
    // boxShadow: '0 0 5px dodgerblue',
}

export { invoicecontent, InvoiceHead, invoiceImg, invoicepic, invoiceHead, paymentDetials, th, td, paymentQrSession, detialAboutPayment, invoiceRow, even, odd, bussinessQuotes, listData, billTo, invoiceNo, shipTo, table , tbody,tBorder,rawInput};