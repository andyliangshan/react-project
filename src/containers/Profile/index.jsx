
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Card from 'components/Card';

import {
  requestUser
} from 'actions';

class Profile extends React.Component {

  componentDidMount() {
    let { actions } = this.props;

    actions.requestUser('evan2x');
  }

  render() {
    return (
      <section>
        <h1>Profile</h1>
        <Card {...this.props} />
      </section>
    );
  }
}

function select(state) {
  let { user } = state;

  return {
    name: user.name,
    uid: user.id,
    email: user.email,
    github: user.github,
    avatar: user.avatar,
    createdAt: user.createdAt,
    location: user.location,
    isFetching: user.isFetching,
    error: user.error
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      requestUser
    }, dispatch)
  }
}

export default connect(select, mapDispatchToProps)(Profile);
