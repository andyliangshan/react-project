
import React from 'react';
import PropTypes from 'prop-types';

import styles from './style.css';

function formatDate(date) {
  if (date == null) return '';
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  let year = date.getFullYear();
  let month = (`0${date.getMonth() + 1}`).slice(-2);
  let day = (`0${date.getDate()}`).slice(-2);

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
    content = <div className={styles.wait}>正在获取用户信息......</div>;
  } else if (error) {
    content = <div className={styles.error}>{error}</div>;
  } else {
    content = (
      <div>
        <h2>{name}</h2>
        <dl className={styles.info}>
          <dt className={styles.avatar}>
            <a href={github}>
              <img src={avatar} alt="" />
            </a>
          </dt>
          <dd>
            <span>location: </span>
            {location}
          </dd>
          <dd>
            <span>email: </span>
            <a href={`mailto:${email}`}>{email}</a>
          </dd>
          <dd>
            <span>date created: </span>
            {formatDate(createdAt)}
          </dd>
        </dl>
      </div>
    );
  }

  return (
    <section className={styles.card}>
      {content}
    </section>
  );
}

Card.defaultProps = {
  error: '',
  email: '',
  github: '',
  avatar: '',
  location: '',
  createdAt: '',
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
