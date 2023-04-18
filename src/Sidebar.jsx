import { Link } from 'react-router-dom';

function Sidebar() {
  const links = [
    { label: 'Home', path: '/' },
    { label: 'Secret', path: '/secret' },
    { label: 'Login', path: '/login' },

  ];

  const renderedLinks = links.map((link) => {
    return (
      <Link
        className="sidebarItem"
        key={link.label}
        to={link.path}
      >
        {link.label}
      </Link>
    );
  });

  return (
    <div className='sidebarWrap'>
      {renderedLinks}
    </div>
  )
    
}

export default Sidebar;
