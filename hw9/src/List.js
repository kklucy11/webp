import React from 'react'
import { Container } from 'semantic-ui-react'
import Items from './Item'
import './List.css'


const List = ({data,setdata}) => {

  return (
    <Container className='list'>
        {data?.map((val)=>{
            return <Items key={val.id} val={val} setdata={setdata}/>
        })}
    </Container>
  )
}

export default List