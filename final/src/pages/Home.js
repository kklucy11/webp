import { useEffect, useState } from 'react';
import { Container, Grid, Item } from 'semantic-ui-react';
import PostInHome from '../component/PostInHome';
import Firebase from '../Firebase/Firebase';


const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    Firebase.firestore().collection("posts").get().then((collectionSnapshot) => {

      const data = collectionSnapshot.docs.map(docSnapshot => {
        const id = docSnapshot.id;
        return { ...docSnapshot.data(), id };
      })
      setPosts(data);
    })
  },[])

  return (
    <Container>
      <Grid>
        <Grid.Column width={2}></Grid.Column>
        <Grid.Column width={13}>
          <Item.Group divided>
            {posts.map((post) => { console.log(post.imageUrl);return <PostInHome post={post} key={post.id} /> })}
          </Item.Group>
        </Grid.Column>
      </Grid>
    </Container>
  )
}

export default Home