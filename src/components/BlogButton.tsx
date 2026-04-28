import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const BlogButton = () => {
  const style: React.CSSProperties = {
    position: 'fixed',
    bottom: '20px',
    right: '140px',
    background: '#fef3c7',
    border: '2px solid #fde68a',
    borderRadius: '12px',
    padding: '12px 16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    zIndex: 1000,
    textDecoration: 'none',
    color: '#27272a',
    fontFamily: '"Pixel", system-ui, Arial, sans-serif',
    fontSize: '0.875rem',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  return (
    <Link to="/blog" style={style}>
      <FontAwesomeIcon icon={faPen} />
      <span>Blog</span>
    </Link>
  );
};

export default BlogButton;