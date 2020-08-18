//FlipCard, used for adventures in both search results and profile page
import React, { useState } from 'react'
import './style.css'
import Gridx from '../Gridx'
import Cell from '../Cell'
import Btn from '../Btn'
import PopupChat from '../../components/PopupChat'
import API from '../../util/API'

//this component takes ina  ton of adventure information
function FlipCard(props) {
    //flip effect is done in CSS with classes, this toggle between those classes
    const [mailbox, setMailbox] = useState([]);
    const [classToggle, setClassToggle] = useState('');
    const [converser, setConverser] = useState({
        firstName: "",
        id: ""
    })
    const [showMessage, setShowMessage] = useState(false);

    const handleClassToggle = () => {
        if (classToggle === 'card--flipped') {
            setClassToggle('')
        } else {
            setClassToggle('card--flipped')
        }
    }
    const handleOpenChat = async (id, name) => {
        await setConverser({
            firstName: name,
            id: id
        })
        handleMailboxOpen()
        setShowMessage(true)
    }
    const hideMessage = ()=>{
        setShowMessage(false)
    }
    const handleMailboxOpen = async (e) => {
        const { data } = await API.getMailbox();
        setMailbox(data.mailbox)
    }

    return (
        <>
            {/* TODO: needs a little better thought through layout */}
            <div className={"flipcard " + classToggle} onClick={handleClassToggle}>
                <div className="card__inner">
                    <div className="card__back">
                        <div className=" grid-container">
                            <Gridx>
                                <Cell size={"text-center details-heading"}>
                                    <h5>{props.title}</h5>
                                </Cell>
                                <Cell size={"small-12"}>
                                    <h6><strong>{props.host}</strong></h6>
                                    <p>{props.description}</p>
                                    <p>{props.itinerary}</p>

                                </Cell>
                            </Gridx>
                            <Gridx>
                                <Cell size={"small-7"}>
                                    <h6><strong>Smth goes here</strong></h6>
                                    <p>i am not sure yet what</p>

                                    {/* Message Button */}
                                    <div>
                                        {props.edit ? null:<button onClick={(e) => {e.stopPropagation();handleOpenChat(props.hostId, props.host)}}>Contact Host</button>}
                                    </div>
                                </Cell>

                                <Cell size={"small-5 p-1"}>
                                    <h6>Details</h6>
                                    <ul>
                                        <li>Group size: {props.minGroupSize}-{props.maxGroupSize} </li>
                                        <li>Duration: {props.number} {props.unit} </li>
                                        <li>Difficulty: {props.difficulty} </li>
                                    </ul>
                                </Cell>
                            </Gridx>
                            <Gridx>
                                <Cell size={"small-6"}>
                                    <hr />
                                    <h6><strong>Location</strong></h6>
                                    <p> {props.location} </p>
                                </Cell>
                                <Cell size={'small-6'}>
                                    {props.edit ? <Btn data-id={props.id} classes={'button'} handleClick={props.editClick} text={'update me'} /> : null}
                                    {props.delete ? <Btn data-id={props.id} classes={'alert button'} handleClick={props.deleteClick} text={'delete me'} /> : null}
                                </Cell>
                            </Gridx>
                        </div>
                    </div>
                    <div className="card__front">
                        <Gridx>
                            <Cell size={"small-12"}>
                                <div className="card-section">
                                    <img src={props.img} alt={props.title} />
                                </div>
                                <div className="card-section">
                                    <h4>{props.title}</h4>
                                    <h5>{props.host}</h5>
                                    <p>{props.description}</p>
                                </div>
                            </Cell>
                        </Gridx>
                    </div>
                </div>
            </div>
            {(showMessage === false)?null:<PopupChat name={converser.firstName} id={converser.id} hide={hideMessage} mailbox = {mailbox} handleOpen={handleMailboxOpen} />}
        </>
    )
}

export default FlipCard;