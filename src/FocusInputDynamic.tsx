import * as React from 'react'

export const FocusInputDynamic = (props: any) => {
    const numberInputRef = React.useRef(null)
    const focusInputRef = React.useRef(null)
    const inputRef = React.useRef([])

    const [inputList, setInputList] = React.useState([])
    const [numberOfInputs, setNumberofInputs] = React.useState<number>(3)
    const [selectedFocus, setSelectedFocus] = React.useState<string>('')
    
    const [focusInputError, setFocusInputError] = React.useState<string>()
    const [numberInputError, setNumberInputError] = React.useState<string>()

    const focusInput = () => {
        var error = validateInput(focusInputRef.current.value)
        console.log(error)
        setFocusInputError(error)
        if(!error) {
            setSelectedFocus(focusInputRef.current.value)
            localStorage.setItem('focus', focusInputRef.current.value)
        }
    }

    const placeFocus = () => {
        const selectedFocusNumber = Number(selectedFocus) - 1 
        if(inputRef.current[selectedFocusNumber]) {
            inputRef.current[selectedFocusNumber].focus()
        }
    }

    const createInputs = () => {
        var error = null
        setNumberInputError(error)
        if(!error) setNumberofInputs(numberInputRef.current.value)
    }

    const validateInput = (value: any) : string => {
        console.log(`validating ${value}`)
        if(isNaN(value)) {
            return 'Input value must be a number!'
        }
        let numberValue = Number(value)
        if(numberValue <= 0 || numberValue > inputList.length)
            return 'Number should be in range of input number!' 
        return null
    }

    React.useEffect(() => {
        placeFocus()
        }, [selectedFocus, numberOfInputs])

    React.useEffect(() => {
        const focus = localStorage.getItem('focus')
        focusInputRef.current.value = focus
        setSelectedFocus(focus)
    }, [])

    React.useEffect(() => {
        let newList = new Array()
        for(var i = 0; i < numberOfInputs; i++)
            {
                newList.push(i)
                setInputList(newList)
            }
        
    }, [numberOfInputs])

    console.log('number of')

    return (
    <React.Fragment>
        <div>
            <label >Number of inputs:</label>
            <input id='numberInput' ref = {numberInputRef} type="text"/>
            <button name='setNumberInput' onClick={createInputs}>Generate inputs</button>
            {numberInputError && <label style={{color: 'red'}}>{numberInputError}</label>}
        </div>
        <div>
            <label >Set focus on input:</label>
            <input id='focusInput' ref={focusInputRef} type="text"/>
            <button name='setFocus' onClick={focusInput}>Set Focus</button>
            {focusInputError && <label style={{color: 'red'}}>{focusInputError}</label>}
        </div>

        {inputList.map((input, idx) => 
            <div>
                <label>Input with id = {idx + 1}</label>
                <input ref={el => inputRef.current[input] = el}/>
            </div>
        )}
    </React.Fragment>
    )
}