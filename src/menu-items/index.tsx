// project import
import home from './home';
import forms from './forms';

// types
import { NavItemType } from 'types/menu';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [home, forms]
};


export default menuItems;
