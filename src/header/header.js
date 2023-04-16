import { Link } from 'react-router-dom';

export const Header = () => {
    const menus = [
        {
          name: 'Multi Agent Simulation of Rock Paper Scissors game',
          url: '/',
        },
      ];
    
      const navItems = menus.map(menu => {
        return (
          <li className="nav-item mx-3" key={menu.url}>
            <Link className="nav-link active" aria-current="page" to={menu.url}><h5>{menu.name}</h5></Link >
          </li>
        );
      });
    
      
    
      return (
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <ul className="navbar-nav flex-grow-1 d-flex flex-row justify-content-end mx-5 mb-2">
                {navItems}
              </ul>
            </div>
          </nav> 
        </div>
      );
  };
  