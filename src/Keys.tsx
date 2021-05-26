import * as React from 'react'

const Item = (props: any) => {
    return ( 
        <div className='form-group'>
            <label  className='col-xs-4 control-label'> {props.name} </label>
            <div className='col-xs-8'>
                <input className='form-control' type='text' />
            </div>
        </div>
    )
}

export const KeysExample = () => {
    const [list, setList] = React.useState([
        {name: 'foo144461', id: '144461'}, 
        {name: 'bar144460', id: '144460'}
    ])

    const addItem = () => {
        const id = (new Date).toString()
        setList([{name: `baz ${id}`, id: id}, ...list])
    }

    return ( 
        <div>
            <b>Usage: </b>
            First write something in the inputs
            Then hit <em>Add item</em> to see what happens
            <hr/>
            <button className='btn btn-primary' onClick = {addItem}><b>Add item</b></button>
        
            <h3>Dangerous <code>key=index</code></h3>
            <div className='form-horizontal'>
               <div className="col-md-12">
                   { list.map((todo, index) => <Item key={index} {...todo}/>)}
               </div>
            </div> 

            <h3>Better <code>key=id</code></h3>
            <form className='form-horizontal'>
                <div className="col-md-12">
                    {list.map((todo) => <Item key={todo.id} {...todo}/>)}
                </div>
            </form>
        </div>
        )
}