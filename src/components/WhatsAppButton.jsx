import { FaWhatsapp } from 'react-icons/fa'
import './WhatsAppButton.css'

export default function WhatsAppButton() {
    return (
        <a
            href="https://wa.me/917983911594"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-float"
            aria-label="Chat on WhatsApp"
            title="Chat on WhatsApp"
        >
            <FaWhatsapp />
        </a>
    )
}
