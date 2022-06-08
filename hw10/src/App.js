import React, { useEffect, useState } from 'react'
import { Button, Container, Grid, Header, Icon, Image, Segment } from 'semantic-ui-react'
import './App.css'
const App = () => {

  const url = 'https://api.github.com/users/cjwu'
  const [data, setData] = useState([])

  useEffect(() => {
    fetch(url).then(res => res.json()).then(json => setData(json))
  }, []
  )


  return (
    <Container >
      <Segment>
        <Image circular src={data?.avatar_url||'https://react.semantic-ui.com/images/wireframe/square-image.png'} size='medium' />
        <Header textAlign='center' style={{fontSize:70}}>{data?.name}</Header>
        <Header textAlign='center' >{data?.login}</Header>
        <Button fluid >Edit profile</Button>
        <Grid textAlign='center' style={{fontSize:20}}>
          <Grid.Row>
            <Icon name='users' />{data?.followers||0}followers．{data?.following||0}following．<Icon name='star outline' />
          </Grid.Row>
          <Grid.Row>
            <Icon name='map marker alternate' />{data?.location}
          </Grid.Row>
          <Grid.Row>
            <Icon name='linkify' link  />html_url: {data?.html_url}
          </Grid.Row>
          <Grid.Row>
            <Icon name='linkify' link />blog: {data?.blog}
          </Grid.Row>
        </Grid>
      </Segment>
    </Container>
  )
}

export default App