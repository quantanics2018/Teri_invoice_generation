import React from "react";
import tempiot from '../assets/logo/tempiot.jpg';
import CryptoJS from 'crypto-js';


function Adminremovemail({ first_name, last_name}) {
    // const currentDate = new Date();
    return (
        <div style={{ backgroundColor: "rgb(238, 236, 235)" }}>
            <div style={{ display: 'flex', flexDirection: 'row', height: "fit-content", backgroundColor: 'white', width: "70%", margin: '0 auto' }}>
                <div style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                        <header>
                            <img src={tempiot} style={{ width: "280px" }} alt="Logo" />
                        </header>
                        <div>
                            <h3 style={{ textAlign: 'left', marginLeft: "10px" }}>Dear {first_name} {last_name},</h3>
                            <p style={{ textAlign: 'left', marginLeft: "10px", whiteSpace: "wrap", wordSpacing: "5px" }}>
                                We hope this message finds you well.
                                We are writing to inform you about a recent change regarding your account role.
                            </p>
                            <p style={{ textAlign: 'left', marginLeft: "10px", whiteSpace: "wrap", wordSpacing: "5px" }}>
                                After careful consideration and review,
                                we have made some adjustments to the administrative privileges on our platform,
                                and your admin role has been updated as of Date.
                                We want to assure you that this decision was not taken lightly and is in no way a reflection of your contributions or commitment to our community.
                            </p>
                            <p style={{ textAlign: 'left', marginLeft: "10px", whiteSpace: "wrap", wordSpacing: "5px" }}>
                                As we continually evaluate and fine-tune our administrative positions,
                                we have made some changes to ensure a balanced and efficient team.
                                We highly value your presence and involvement within our community,
                                and we want to express our gratitude for all the positive contributions you have made.
                            </p>
                            <p style={{ textAlign: 'left', marginLeft: "10px", whiteSpace: "wrap", wordSpacing: "5px" }}>
                                While your admin privileges have been adjusted,
                                please know that you are still an integral part of our community,
                                and your insights and participation remain highly appreciated.
                                You can continue to actively engage and contribute to discussions, events, and various aspects of the platform.
                            </p>
                            <p style={{ textAlign: 'left', marginLeft: "10px", whiteSpace: "wrap", wordSpacing: "5px" }}>
                                If you have any questions or would like to discuss this further,
                                please don't hesitate to contact us. We are more than willing to provide any clarifications
                                and address any concerns you may have.
                            </p>
                            <p style={{ textAlign: 'left', marginLeft: "10px", wordSpacing: "5px" }}>
                                Thank you for your understanding, 
                                and we look forward to your continued presence within our community.
                            </p>
                            <p style={{ textAlign: 'left', marginLeft: "10px" }}>
                                Best Regards,<br />
                                Quantanics Techserv
                            </p>
                        </div>
                        <footer style={{ width: "100%" }}>
                            <p style={{ backgroundColor: 'rgb(92, 92, 232)', color: 'white', padding: "20px", height: "fit-content" }}>
                                {'\u00A0'}*** This message is intended only for the person or entity to which it is addressed and may contain confidential and/or
                                privileged information. If you have received this message in error, please notify the sender immediately and
                                delete this message from your system ***
                            </p>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Adminremovemail;