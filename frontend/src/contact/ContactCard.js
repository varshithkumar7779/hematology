import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

const ContactCard = (props) => {
  const{id,name,email}=props.contact
  return (
    <div className="item">
            <div className="contact">
                <div className="header">{name}</div>
                <div>{email}</div>
                <div>
                <FontAwesomeIcon icon={icon({name: 'trash', family: 'classic'})}/>
                </div>
            </div>
    </div>
  )
}

export default ContactCard