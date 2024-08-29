import phone from './phone.png'
import mail from './mail.png'
import './Contact.css'

function Contact({user}) {
    return (<>
        <div className='contact'>
            <h4>We are happy to help our users!</h4><br/>
            <img src={phone} alt='phone' width='70px' height='70px'/> <p>1-800-CTTT</p>
            <img src={mail} alt='mail' width='70px' height='70px'/>  <p>contact@thetzedakahtracker.com</p>
            <p>We will try to get back to you within one day of your reaching out.</p>
        </div>
        </>)
}

export default Contact;