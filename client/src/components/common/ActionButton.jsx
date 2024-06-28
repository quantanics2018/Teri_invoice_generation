import { faAnglesDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Icon from "react-icons-kit";
import { ic_label_important } from "react-icons-kit/md/ic_label_important";
import { overflow_visible , position_initial } from "../../assets/style/cssInlineConfig";

const ActionButton = ({fun_to_rotate_btn,index,rotatedIndex,data,updateUserStatus,props,StaffDetialsEditPage}) => {
    // const [rotatedIndex, setRotatedIndex] = useState(null);

    return (
        <div className="col-head display-flex device_action_dropdown_parent" style={overflow_visible}>
            <div className="sts_icon"
                onClick={fun_to_rotate_btn}
            >
                <Icon icon={ic_label_important} style={{ transform: rotatedIndex === index ? 'rotate(90deg)' : 'rotate(0)', color: rotatedIndex === index ? '#08c6cd' : 'lightgray', }} className='device_content_arrow' size={25} />
            </div>
            <div className='dropdownAll'>{(rotatedIndex === index) &&
                (<div className='device_action_dropdown' style={position_initial}>
                    <div className='display-flex device_action_dropdown1 dropdown_action'
                        onClick={StaffDetialsEditPage}
                    >
                        <FontAwesomeIcon className='device_content_arrows' icon={faAnglesDown} size='lg' />
                        <div className='device_content_dropdown display-flex'

                        >Edit
                            {props.position === 2 &&
                                " Distibutor "
                            }
                            {props.position === 3 &&
                                " Customer "
                            }
                            {props.position === 4 &&
                                " Staff "
                            }
                            {props.position === 5 &&
                                " D_Staff "
                            }
                            Details</div>
                    </div>

                    <div className='display-flex device_action_dropdown2 dropdown_action'
                        onClick={updateUserStatus}
                        // ref={modalRef}
                        >
                        <FontAwesomeIcon icon={faAnglesDown} className='device_content_arrows' size='lg' />
                        {data.status == 1 ? (
                            <div className='device_content_dropdown display-flex'
                            >Delete
                                {props.position === 2 &&
                                    " Distibutor "
                                }
                                {props.position === 3 &&
                                    " Customer"
                                }
                                {props.position === 4 &&
                                    " Staff "
                                }
                                {props.position === 5 &&
                                    " D_Staff "
                                }
                               
                            </div>
                        ) : (
                            <div className='device_content_dropdown display-flex'
                            >Activate {props.position === 4 &&
                                "Staff "
                                }
                                {props.position === 2 &&
                                    "Distibutor "
                                }
                            </div>
                        )}

                    </div>
                </div>
                )}
            </div>
        </div>
    )
}
export default ActionButton;