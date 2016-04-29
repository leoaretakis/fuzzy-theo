import React, { PropTypes } from 'react'
import MenuLink from './MenuLink';
import menus from '../constants/MenuTypes'

const MainMenu = () => (
  <ul>
    {
      menus.map((menu) => (
        <li key={menu.page}>
          <MenuLink page={menu.page}>
          {menu.title}
          </MenuLink>
        </li>
      ))
    }
  </ul>
);

// MainMenu.propTypes = {
//   active: PropTypes.bool.isRequired,
//   children: PropTypes.node.isRequired,
//   onClick: PropTypes.func.isRequired
// }

export default MainMenu
