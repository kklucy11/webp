import React from 'react';
import { Image, Item, Icon, Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const PostInHome = ({ post }) => (
  <Item key={post.id} as={Link} to={`/${post.id}`}>
    <Item.Image src={post.imgURL || "https://react.semantic-ui.com/images/wireframe/image.png"} />
    <Item.Content>
      <Item.Meta>
        {post.author.photoURL ? (<Image src={post.author.photoURL} size="mini" avatar />) : (<Icon name="user circle" />)}
        {post.author.displayName || "使用者"}
      </Item.Meta>
      <Item.Description ><Card >{post.content}</Card></Item.Description>
      <Item.Extra>留言 {post.commentsContent ? post.commentsContent : 0}。按讚 {post.LikedBy?.length || 0} </Item.Extra>
    </Item.Content>
  </Item>
)

export default PostInHome
