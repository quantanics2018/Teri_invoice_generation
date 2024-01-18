// FormComponent.js

const handleSubmit = async (e, postData) => {
    const isValidMF_Id = /^[a-zA-Z]+$/.test(postData.MF_Id)
    const isValidUserName = /^[a-zA-Z]+$/.test(postData.M_User_Name)
    const isValidAadhar = /^[a-zA-Z]+$/.test(postData.M_Aadhar_Number)
    const isValidPosition = /^[a-zA-Z]+$/i.test(postData.M_Position)
    const isValidGST = /^[a-zA-Z]+$/.test(postData.M_GST_Number)
    const isValidBussinessType = /^[a-zA-Z]+$/.test(postData.M_Business_Type)
    const isValidEmail = /^[a-zA-Z]+$/.test(postData.M_Email)
    const isValidAcc_No = /^[a-zA-Z]+$/.test(postData.M_Account_Number)
    const isValidPhoneNo = /^[a-zA-Z]+$/.test(postData.M_Phone_No)
    const isValidPANno = /^[a-zA-Z]+$/.test(postData.M_Pan_Number)
    const isValidOrganisationNo = /^[a-zA-Z]+$/.test(postData.M_Organization_Name)
    const isValidUpiId = /^[a-zA-Z]+$/.test(postData.M_Upi_Id)
};


export { handleSubmit };
