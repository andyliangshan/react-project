
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  requestRepos
} from 'actions';

import styles from './style.css';

class Repositories extends React.Component {

  componentDidMount() {
    let { actions } = this.props;

    actions.requestRepos('evan2x');
  }

  renderTable() {
    let { repos, isFetching, error } = this.props;

    if (isFetching) {
      return (
        <tr>
          <td colSpan="3" className={styles.wait}>正在加载数据。。。</td>
        </tr>
      );
    }

    if (error) {
      return (
        <tr>
          <td colSpan="3" className={styles.error}>{error}</td>
        </tr>
      );
    }

    return repos.map(repo => <tr key={repo.id}>
      <td><a href={repo.url}>{repo.name}</a></td>
      <td>{repo.lang}</td>
      <td>{repo.desc}</td>
    </tr>);
  }

  render() {

    return (
      <section>
        <h1>Repositories</h1>
        <table className={styles.table}>
          <thead>
            <tr>
              <th width="210">Name</th>
              <th width="113">Language</th>
              <th width="456">Description</th>
            </tr>
          </thead>
          <tbody>
            {this.renderTable()}
          </tbody>
        </table>
      </section>
    );
  }
}

function select(state) {
  let repos = state.repos;

  return {
    repos: repos.list,
    isFetching: repos.isFetching,
    error: repos.error
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      requestRepos
    }, dispatch)
  }
}

export default connect(select, mapDispatchToProps)(Repositories);
