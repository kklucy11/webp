import React, { useEffect, useState } from 'react';
import { Tab, Container, Header, Image, Button, Segment, Modal, Input } from 'semantic-ui-react';
import Myfavorites from '../component/Myfavorites';
import Myposts from '../component/Myposts';
import Firebase from '../Firebase/Firebase';

function Myname({ user }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [displayName, setDisplayName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function changedisplayname() {
        setIsLoading(true);
        user.updateProfile({
            displayName,
        }).then(() => {
            setDisplayName("");
            setIsModalOpen(false);
            setIsLoading(false);
        });
    };

    return (
        <>
            <Header size="small">
                會員名稱
                <Button floated='right' onClick={() => { setIsModalOpen(true) }}>修改</Button>
            </Header>
            <Segment vertical>{user.displayName}</Segment>
            <Modal open={isModalOpen} size="mini">
                <Modal.Header>修改會員名稱</Modal.Header>
                <Modal.Content>
                    <Input fluid placeholder="輸入新的會員名稱" value={displayName} onChange={(e) => { setDisplayName(e.target.value) }} />
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => { setIsModalOpen(false) }}>取消</Button>
                    <Button onClick={changedisplayname} loading={isLoading}>修改</Button>
                </Modal.Actions>
            </Modal>
        </>
    )
};

function Myphoto({ user }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [photoURL, setphotoURL] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const previewUrl = photoURL ? URL.createObjectURL(photoURL) : user.photoURL

    function changephotoURL() {
        setIsLoading(true);
        const fileRef = Firebase.storage().ref('user-photos/' + user.uid);
        const metadata = { contentType: photoURL.type };
        fileRef.put(photoURL, metadata).then(() => {
            fileRef.getDownloadURL().then((imageUrl) => {
                user.updateProfile({
                    photoURL: imageUrl,
                }).then(() => {
                    setphotoURL(null);
                    setIsModalOpen(false);
                    setIsLoading(false);
                })
            });
        });

    };

    return (
        <>
            <Header size="small">
                會員照片
                <Button floated='right' onClick={() => { setIsModalOpen(true) }}>修改</Button>
            </Header>
            <Segment vertical><Image src={user.photoURL} avatar /></Segment>
            <Modal open={isModalOpen} size="mini">
                <Modal.Header>修改會員照片</Modal.Header>
                <Modal.Content image>
                    <Image src={previewUrl} avatar wrapped />
                    <Modal.Description>
                        <Button as="label" htmlFor="post-image">上傳</Button>
                        <Input id="post-image" type="file" style={{ display: 'none' }} onChange={(e) => { setphotoURL(e.target.files[0]) }} />
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => { setIsModalOpen(false) }}>取消</Button>
                    <Button onClick={changephotoURL} loading={isLoading}>修改</Button>
                </Modal.Actions>
            </Modal>
        </>
    )
};
const My = ({ user }) => {
    const picture = user.photoURL
    const [posts, setPosts] = useState([]);
    const [coposts, setcoPosts] = useState([]);
    useEffect(() => {
        Firebase.firestore().collection("posts").where("author.uid", "==", user.uid).get().then((collectionSnapshot) => {
            const data = collectionSnapshot.docs.map(docSnapshot => {
                const id = docSnapshot.id;
                return { ...docSnapshot.data(), id };
            })
            setPosts(data);
        })
    })
    

    useEffect(() => {
        Firebase.firestore().collection("posts").where("collectedBy", "array-contains", user.uid).get().then((collectionSnapshot) => {
            const data = collectionSnapshot.docs.map(docSnapshot => {
                const id = docSnapshot.id;
                return { ...docSnapshot.data(), id };
            })
            setcoPosts(data);
        })
    })

    const panes = [
        { menuItem: '我的貼文', render: () => <Tab.Pane><Myposts posts={posts} /> </Tab.Pane> },
        { menuItem: '我的收藏', render: () => <Tab.Pane><Myfavorites coposts={coposts}/></Tab.Pane> },
    ]

    return (
        <Container>
            <Header>會員資料</Header>
            <Myname user={user} />
            <Myphoto user={user} />
            <Header as='h2' icon textAlign='center'>
                <Image circular src={picture} />
                <Header.Content>{user.displayName}</Header.Content>
            </Header>
            <Tab panes={panes} />
        </Container>
    )
}

export default My



