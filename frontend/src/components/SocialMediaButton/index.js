import './style.css';

function SocialMediaButton({ icon, link, color}) {
    return (
        <a
            className="social-media"
            style={{backgroundColor: color}}
            href={link}
            target="_blank"
        >
            { icon }
        </a>
    );
}

export default SocialMediaButton;