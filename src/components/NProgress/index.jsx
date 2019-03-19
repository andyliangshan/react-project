import React from 'react';
import PropTypes from 'prop-types';
import nprogress from 'nprogress';

import 'nprogress/nprogress.css';

/* eslint-disable react/require-default-props, react/no-unused-prop-types */

/**
 * In addition to the `template`， other configurations are the same as the `nprogress.configure`
 * see also https://github.com/rstacruz/nprogress/#configuration
 */
export default class NProgress extends React.PureComponent {
  static propTypes = {
    color: PropTypes.string,
    minimum: PropTypes.number,
    easing: PropTypes.string,
    speed: PropTypes.number,
    trickle: PropTypes.bool,
    trickleSpeed: PropTypes.number,
    showSpinner: PropTypes.bool,
    parent: PropTypes.string
  }

  static defaultProps = {
    color: '#29d'
  }

  constructor(props) {
    super(props);
    nprogress.configure({
      ...props,
      template: `
        <div class="bar" role="bar" style="background: ${props.color}">
          <div class="peg" style="box-shadow: 0 0 10px ${props.color}, 0 0 5px ${props.color}"></div>
        </div>
        <div class="spinner" role="spinner">
          <div class="spinner-icon" style="border-color: ${props.color}"></div>
        </div>
      `
    });
  }

  componentWillMount() {
    nprogress.start();
  }

  componentWillUnmount() {
    nprogress.done(true);
  }

  render() {
    return null;
  }
}
