
import React, {PropTypes} from 'react';

import styles from './style.css';

function formatDate(date) {
  if (date == null) return '';
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  let year = date.getFullYear(),
    month = ('0' + (date.getMonth() + 1)).slice(-2),
    day = ('0' + date.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
}

function Card({
  name,
  email,
  github,
  avatar,
  location,
  createdAt,
  error,
  isFetching
}) {
  let content = null;

  if (isFetching) {
    content = <div className={styles.wait}>正在获取用户信息。。。</div>;
  } else {
    if (error) {
      content = <div className={styles.error}>{error}</div>;
    } else {
      content = <div>
        <h2>{name}</h2>
        <dl className={styles.info}>
          <dt className={styles.avatar}>
            <a href={github}>
              <img src={avatar} />
            </a>
          </dt>
          <dd>location: {location}</dd>
          <dd>email: <a href={`mailto:${email}`}>{email}</a></dd>
          <dd>date created: {formatDate(createdAt)}</dd>
        </dl>
      </div>;
    }
  }

  return (
    <section className={styles.card}>
      {content}
    </section>
  );
}

Card.defaultProps = {
  error: '',
  isFetching: false
};

Card.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string,
  github: PropTypes.string,
  avatar: PropTypes.string,
  location: PropTypes.string,
  createdAt: PropTypes.string,
  error: PropTypes.string,
  isFetching: PropTypes.bool
};

export default Card;
