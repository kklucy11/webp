import React from 'react';
import PostInHome from './PostInHome';
import { Item } from 'semantic-ui-react';
const Myposts = ({ posts }) => {

  return (
    <Item.Group divided>
      {posts.map((post) => { return <PostInHome post={post} key={post.id} /> })}
    </Item.Group>
  )
}

export default Myposts 
