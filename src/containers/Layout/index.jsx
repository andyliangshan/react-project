import React from 'react';
import { Link } from 'react-router';

import styles from './style.css';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <nav className={styles.nav}>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/repositories">Repositories</Link></li>
          </ul>
        </nav>
        <div className={styles.content}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
