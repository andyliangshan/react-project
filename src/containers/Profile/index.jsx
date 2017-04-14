
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Card from 'components/Card';

import {
  requestUser
} from 'modules/profile/actions';

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
  let profile = state.profile;

  return {
    name: profile.name,
    uid: profile.id,
    email: profile.email,
    github: profile.github,
    avatar: profile.avatar,
    createdAt: profile.createdAt,
    location: profile.location,
    isFetching: profile.isFetching,
    error: profile.error
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
