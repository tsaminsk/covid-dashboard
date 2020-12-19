import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ModuleNav.scss';
import sprite from '../../../assets/images/sprite.svg';

class ModuleNav extends Component {
  constructor(props) {
    super(props);
    const { navCurrentItems } = this.props;
    this.state = {
      isFull: true,
      menuIsOpen: false,
      nuvCurrentItems: navCurrentItems,
      openInputDropdown: false
    };
    this.handlerInput = this.handlerInput.bind(this);
  }

  componentDidMount() {
    const { navItems } = this.props;
    navItems.forEach((group, groupId) => {
      if (groupId < group.length - 1) group.push('separator');
    });
  }

  toggleFullWin() {
    const { isFull } = this.state;
    this.setState({
      isFull: !isFull,
      menuIsOpen: false,
    });
    const { toggleFullWin } = this.props;
    toggleFullWin(isFull);
  }

  toggleMenu() {
    const { menuIsOpen } = this.state;
    this.setState({ menuIsOpen: !menuIsOpen });
    if (!menuIsOpen) {
      window.addEventListener('click', this.closeMenu.bind(this));
    } else {
      window.removeEventListener('click', this.closeMenu.bind(this));
    }
  }

  closeMenu(e) {
    const { idx } = this.props;
    if (!e.target.closest(`#${idx}`)) {
      this.setState({ menuIsOpen: false });
      window.removeEventListener('click', this.closeMenu.bind(this));
    }
  }

  toggleCurrentMenuItem(id, groupId) {
    const { menuIsOpen, nuvCurrentItems } = this.state;
    nuvCurrentItems[groupId] = id;
    this.setState({
      menuIsOpen: !menuIsOpen,
      nuvCurrentItems,
    });
    const { toggleNavItem } = this.props;
    toggleNavItem(nuvCurrentItems);
  }

  handlerInput = (event) => {
    console.log(event.target.value);
    this.setState({
      openInputDropdown: true
    })
  };

  render() {
    const { isFull, menuIsOpen, nuvCurrentItems, openInputDropdown } = this.state;
    const fullIcon = isFull ? '#open-full' : '#close-full';
    const menuWrapperClassName = menuIsOpen ? 'is-open' : '';
    const inputDropdownClassName = openInputDropdown ? 'is-open' : '';
    const { navItems, idx, hasInput } = this.props;
    const menuItem = (el, id, groupId) => {
      return (
        <li
          className={`module-nav__menu-item ${
            id === nuvCurrentItems[groupId] ? 'is-current' : ''
          }`}
          key={`${id + 1}-${groupId + 1}`.toString()}
        >
          <button
            type="button"
            onClick={this.toggleCurrentMenuItem.bind(this, id, groupId)}
          >
            {el}
          </button>
        </li>
      );
    };
    const separatorItem = (id, groupId) => {
      return (
        <li
          className={
            ('module-nav__menu-item', 'module-nav__menu-item--separator')
          }
          key={`${id + 1}-${groupId + 1}`.toString()}
        />
      );
    };
    const createOneListInnerContent = (el, id, groupId) => {
      return el === 'separator'
        ? separatorItem(id, groupId)
        : menuItem(el, id, groupId);
    };
    const menuOneList = (groupe, groupId) =>
      groupe.map((el, id) => createOneListInnerContent(el, id, groupId));
    const menuNavListsContent = navItems.map((groupe, groupId) => (
      <ul
        className="module-nav__menu-list"
        key={`unic-menu-list-${groupId + 1}`}
      >
        {menuOneList(groupe, groupId)}
      </ul>
    ));
    return (
      <div className="module-nav" id={idx}>
        <div className={`module-nav__menu ${menuWrapperClassName}`}>
          <div className="module-nav__menu-icon">
            <button type="button" onClick={this.toggleMenu.bind(this)}>
              <svg width="24" height="24">
                <use href={`${sprite}#menu`} />
              </svg>
            </button>
          </div>
          <div className="module-nav__menu-dropdown">{menuNavListsContent}</div>
        </div>
        {hasInput &&
          <div className="module-nav__input-wrap">
            <input type="test" placeholder="Search country" onInput={this.handlerInput}/>
            <div className={`module-nav__input-dropdown ${inputDropdownClassName}`} ></div>
          </div>
        }
        <div className="module-nav__full">
          <button type="button" onClick={this.toggleFullWin.bind(this)}>
            <svg width="24" height="24">
              <use href={sprite + fullIcon} />
            </svg>
          </button>
        </div>
      </div>
    );
  }
}

ModuleNav.propTypes = {
  toggleFullWin: PropTypes.func.isRequired,
  navItems: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  toggleNavItem: PropTypes.func.isRequired,
  navCurrentItems: PropTypes.arrayOf(PropTypes.number).isRequired,
  idx: PropTypes.string.isRequired,
};

export default ModuleNav;
