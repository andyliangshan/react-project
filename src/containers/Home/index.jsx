import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/* eslint-disable react/prop-types */

import {
  requestIntro
} from '@/modules/home/actions';

class Home extends React.Component {
  componentDidMount() {
    let { actions } = this.props;

    actions.requestIntro().then(() => {
      // console.log('successed!');
    });
  }

  render() {
    const { intro } = this.props;

    return (
      <section>
        <h1>Home</h1>
        <article>
          <p>{intro}</p>
        </article>
      </section>
    );
  }
}

export default connect(state => ({
  intro: state.home.content
}), dispatch => ({
  actions: bindActionCreators({
    requestIntro
  }, dispatch)
}))(Home);
