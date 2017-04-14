
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  requestIntro
} from 'modules/home/actions';

class Home extends React.Component {
  componentDidMount() {
    let { actions } = this.props;

    actions.requestIntro();
  }

  render() {
    return (
      <section>
        <h1>Home</h1>
        <article>
          <p>{this.props.intro}</p>
        </article>
      </section>
    );
  }
}

function select(state) {
  return {
    intro: state.home.content
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      requestIntro
    }, dispatch)
  }
}

export default connect(select, mapDispatchToProps)(Home);
