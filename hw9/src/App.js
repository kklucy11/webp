import React, { useState } from 'react'
import {Container, Form, Header,Input,Button,Divider} from 'semantic-ui-react'
import List from './List'
import {v4} from 'uuid'
const App = () => {

  const [inner,setInner] =useState("")
  const [data,setData] =useState([])
  
  function submit(){
    setData(function(predata){
      return([...predata,{id:v4(),inner,doit:false}])
    },
    setInner("")
    )
  }

  return (
    <Container>
    <Header as='h1'>CGU TO DO LIST</Header>
    <Form onSubmit={submit}>
      <Input placeholder='Add a new todo...' type='text' value={inner} onChange={(v)=>{setInner(v.target.value)}}/>
      <Button>Add</Button>
    </Form>
    <Divider />
    <List data={data} setdata={setData}/>
    </Container>
  )
}

export default App