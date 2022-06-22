import { Container, Header, Form, Image, Button, Grid } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import firebase from '../Firebase/Firebase';
import { useState } from 'react';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';



const Newpost = ({ user }) => {
    const [content, setContent] = useState("");
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const previewUrl = file ? URL.createObjectURL(file) : "https://react.semantic-ui.com/images/wireframe/image.png"


    function onSubmit() {
        setIsLoading(true);
        var imgURL="";
        const documentRef = firebase.firestore().collection("posts").doc();
        if (file) {
            const fileRef = firebase.storage().ref('posts-image/' + documentRef.id);
            const metadata = { contentType: file.type };
            fileRef.put(file, metadata).then(() => {
                imgURL = fileRef.getDownloadURL();
            })
            console.log(imgURL)
        }
        documentRef.set({
            content,
            createAt: firebase.firestore.Timestamp.now(),
            author: {
                displayName: user.displayName || "",
                photoURL: user.photoURL || "",
                uid: user.uid
            },
            imgURL,
        }).then(() => {
            setIsLoading(false);
            navigate('/');
        });
    }

    return (
        <Container>
            <Grid>
                <Grid.Column width={4}></Grid.Column>
                <Grid.Column width={10}>
                    <Header>發表文章</Header>
                    <Form onSubmit={onSubmit}>
                        <Image src={previewUrl} size="small" floated="left" />
                        <Button basic as="label" htmlFor="post-image" >上傳圖片</Button>
                        <Form.Input id="post-image" type="file" style={{ display: 'none' }}
                            onChange={(e) => { setFile(e.target.files[0]) }}
                        />
                        <Form.TextArea label="文章內容" placeholder="輸入文章內容" value={content} onChange={(e) => { setContent(e.target.value) }} width={8} />
                        <Form.Button loading={isLoading}>送出</Form.Button>
                    </Form>
                </Grid.Column>
            </Grid>
        </Container>
    )
}

export default Newpost;