import React from 'react';
import emailjs from 'emailjs-com';


export default function Contacto() {

    function sendEmail(e) {
        e.preventDefault();

        emailjs.sendForm('service_myznhyg', 'template_0ox8qt3', e.target, 'user_BZzmPmLVZ1sJ2alDio8vi')
            .then((result) => {
                console.log(result.text);
                alert(result.text)
            }, (error) => {
                console.log(error.text);
            });
        e.target.reset();
    }

    return (
        <div className="container">
            <form className="contact-form mt-3" onSubmit={sendEmail}>
                <input type="hidden" name="contact_number" />
                <label className="form-label">Name</label>
                <input className="form-control" type="text" name="user_name" />
                <label className="form-label">Email</label>
                <input className="form-control" type="email" name="user_email" />
                <label className="form-label">Message</label>
                <textarea className="form-control" name="message" />
                <input className="form-control mt-5 bg-dark text-white" type="submit" value="Send" />
            </form>
        </div>
    );
}
/*

*/