import React from 'react'
import { useState, useEffect } from 'react';
import { Container, Item, Image, Icon, Segment, Comment, Form, Header, Grid  } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import Firebase from '../Firebase/Firebase';
import 'firebase/storage';

const Posts = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({ author: {} });
  const [commentContent, setCommentContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const isCollected = post.collectedBy?.includes(Firebase.auth().currentUser.uid);
  const isLiked = post.LikedBy?.includes(Firebase.auth().currentUser.uid);

  useEffect(() => {
    Firebase.firestore().collection("posts").doc(postId).onSnapshot((docSnapshot) => {
      const data = docSnapshot.data();
      setPost(data);
    });
  },[]);

  useEffect(() => {
    Firebase.firestore().collection("posts").doc(postId).collection("comments").orderBy('createdAt').onSnapshot((collectionSnapshot) => {
      const data = collectionSnapshot.docs.map(doc => {
        return doc.data();
      });
      setComments(data);
    })
  },[]);

  function onSubmit() {
    setIsLoading(true);
    const firestore = Firebase.firestore();
    const batch = firestore.batch();
    const postRef = firestore.collection("posts").doc(postId);

    batch.update(postRef, {
      commentsContent: Firebase.firestore.FieldValue.increment(1),
    });

    const commentRef = postRef.collection("comments").doc();
    batch.set(commentRef, {
      conent: commentContent,
      createdAt: Firebase.firestore.Timestamp.now(),
      author: {
        uid: Firebase.auth().currentUser.uid,
        displayname: Firebase.auth().currentUser.displayName || " ",
        photoURL: Firebase.auth().currentUser.photoURL || " "
      }
    });

    batch.commit().then(() => {
      setCommentContent("");
      setIsLoading(false);
    });
  }

  function toggleCollect() {
    const uid = Firebase.auth().currentUser.uid;
    Firebase.firestore().collection("posts").doc(postId).update({
      collectedBy: isCollected ? Firebase.firestore.FieldValue.arrayRemove(uid) : Firebase.firestore.FieldValue.arrayUnion(uid)
    })
    console.log("?????????collect")
  }
  function toggleLike() {
    const uid = Firebase.auth().currentUser.uid;
    Firebase.firestore().collection("posts").doc(postId).update({
      LikedBy: isLiked ? Firebase.firestore.FieldValue.arrayRemove(uid) : Firebase.firestore.FieldValue.arrayUnion(uid)
    })
    console.log("?????????like")
  }
  return (
    <Container>
      <Grid>
        <Grid.Column width={2}></Grid.Column>
        <Grid.Column width={13}>
          <Item >
            <Item.Meta>
              {post.author.photoURL ? (<Image src={post.author.photoURL} avatar />) : (<Icon name="user circle" />)}
              {post.author.displayname || "?????????"}
            </Item.Meta>
            <Item.Extra>{post.createdAt?.toDate().toLocaleDateString()}</Item.Extra>
            <Item.Image src={post.imgURL} />
            <Segment basic vertical>{post.content}</Segment>
            <Segment basic vertical>
              ?????? {post.commentsContent ? post.commentsContent : 0}?????? {post.LikedBy?.length || 0}???
              <Icon link onClick={toggleLike} name={`heart${isLiked ? '' : ' outline'}`} color={isLiked ? 'red' : 'grey'} />???
              <Icon link onClick={toggleCollect} name={`bookmark${isCollected ? '' : ' outline'}`} color={isCollected ? 'blue' : 'grey'} />
            </Segment>
            <Comment.Group>
              <Form reply>
                <Form.TextArea value={commentContent} onChange={(e) => { setCommentContent(e.target.value) }} />
                <Form.Button loading={isLoading} onClick={onSubmit}>??????</Form.Button>
              </Form>
              <Header>???{post.commentsContent ? post.commentsContent : 0}?????????</Header>
              {comments.map((comment) => {
                return (
                  <Comment key={comment.id}>
                    <Comment.Avatar src={comment.author.photoURL || <Icon name="user circle" />} />
                    <Comment.Content>
                      <Comment.Author as="span">{comment.author.displayName || "?????????"}</Comment.Author>
                      <Comment.Metadata>{comment.createdAt.toDate().toLocaleDateString()}</Comment.Metadata>
                      <Comment.Text>{comment.conent}</Comment.Text>
                    </Comment.Content>
                  </Comment>
                )
              })}
            </Comment.Group>
          </Item>
        </Grid.Column>
      </Grid>
    </Container>
  )

}

export default Posts;