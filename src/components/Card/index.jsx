
import React, {PropTypes} from 'react';

import styles from './style.css';

function Card({name, email, github, avatar}) {
  return (
    <section className={styles.card}>
      <h2>{name}</h2>
      <p className={styles.avatar}>
        <a href={github}>
          <img src={avatar} />
        </a>
      </p>
      <p>email: <a href={`mailto:${email}`}>{email}</a></p>
    </section>
  );
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string,
  github: PropTypes.string,
  avatar: PropTypes.string
}

export default Card;
