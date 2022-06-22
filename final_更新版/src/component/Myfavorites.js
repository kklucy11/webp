import React from 'react';
import { Item } from 'semantic-ui-react';
import PostInHome from './PostInHome';
const Myfavorites = ({coposts}) => {
  return (
    <Item.Group divided>
      {coposts.map((copost) => { return <PostInHome post={copost} key={copost.id} /> })}
    </Item.Group>
  )
}

export default Myfavorites