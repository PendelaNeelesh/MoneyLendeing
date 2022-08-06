import React from 'react'
import "../css/footer.css"
const Footer = () => {
    return (
        <div id='footer'>
            <div className="footer">
                <div className="foot-part">Contact Us<br /><a href="#about">About Us</a><br /><a href="#">Contact</a></div>
                <div className="foot-part">Help<br /><a href="#">FAQ for Borrowers</a><br /><a href="#">FAQ for Lenders</a><br /><a href="#">Glossary</a></div>
                <div className="foot-part">Legal Procedures<br /><a href="#">Terms of Use</a><br /><a href="#">Privacy and Security Policy</a><br /><a href="#">Fair Practices Code</a><br /><a href="#">Grievance Redressal Policy</a></div>
                <div className="foot-part">Follow us on<br /><a href="#"><img src="meta.png" alt="meta" width="20px" style={{ margin: '2px 2px 2px 2px' }} /></a><a href="#"><img src="insta.jfif" alt="Instagram" width="20px" style={{ margin: '2px 2px 2px 2px' }} /></a><a href="#"><img src="yt.jpg" alt="Youtube" width="20px" style={{ margin: '2px 2px 2px 2px' }} /></a><a href="#"><img src="in.jfif" alt="Linked-in" width="20px" style={{ margin: '2px 2px 2px 2px' }} /></a></div>
                <div className="foot-part">Payment Methods<br /><img src="../wallet.jpeg" alt="Wallet" width="250px" height="120px" /><br /><br /></div>
            </div>
        </div>
    )
}

export default Footer
