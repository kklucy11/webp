import React, { useState } from 'react'
import { Container, Segment, Icon ,Button} from 'semantic-ui-react'
import './Item.css'

const Items = ({ val, setdata }) => {

    const [finish, setFinish] = useState(val?.doit)

    function del() {
        setdata(function (prev) {
            return prev.filter(item => item.id !== val.id)
        })
    }
    function comp() {
        setdata(function (prev) {
            prev.map((data) => {
                if (data.id === val.id) data.doit = !data.doit;
                console.log('doit', data.doit)
                return (data)
            })
            return (prev)
        })
        setFinish(!finish)
    }
    console.log(finish)
    return (
        <Container className='item' textAlign='left' >
            <Segment className={finish ? 'yesdo' : 'nodo'} horizontal>
                <Icon name='check' link onClick={comp} color={finish ? "red" : "grey"} />
                {val?.inner}  
                <Button Icon onClick={del} floated='right' compact><Icon name='trash alternate'/></Button>
            </Segment>
        </Container >
    )
}

export default Items