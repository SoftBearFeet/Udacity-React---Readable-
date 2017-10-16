import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NavOrderTab from './nav_sorts';

import { fetchCategoryPosts, fetchPosts, orderByVote, orderByTime } from '../actions';

class Category extends Component {
  componentDidMount() { 
    this.props.fetchPosts();
  }

  renderPosts = () => {
    
    return _.map(this.props.posts, post => {
      return (
        <li key={post.id}>
          <Link to={`/posts/${post.id}`} >
            {post.title}
          </Link>
        </li>
      );
    });
  }
  
  render() {
    return (
      <div className='App'>
        <div className='sort-tab'>
          <h5>Sort by:</h5> <NavOrderTab orderByTime={this.props.orderByTime} orderByVotes={this.props.orderByVote} topic='posts' />
        </div>
        <h3 className='index'>Category: {this.props.match.params.cats}</h3>
        <ul className='list-group'>
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  return {
    posts: _.omitBy(posts, (post) => post.category !== ownProps.match.params.cats),
  }
}

export default connect(mapStateToProps, { fetchPosts, orderByVote, orderByTime })(Category);