import * as React from 'react'

export const FocusInputDynamic = (props: any) => {
    const numberOfInputsInput = React.useRef()
    
    const [numberInputValue, setNumberInputValue] = React.useState<number>()
    const [numberOfInputs, setNumberofInputs] = React.useState<number>(3)

    const list = [...Array(3).keys()]
    const inputRef = React.useRef([])

    const [focusInputValue, setFocusInputValue] = React.useState<string>('')
    const [selectedFocus, setSelectedFocus] = React.useState<string>('')

    const focusInput = () => {
        setSelectedFocus(focusInputValue)
        localStorage.setItem('focus', focusInputValue)
    }

    const placeFocus = () => {
        const selectedFocusNumber = Number(selectedFocus) - 1 
        if(inputRef.current[selectedFocusNumber]) {
            inputRef.current[selectedFocusNumber].focus()
        }
    }

    const handleChange = (value: string) => {
        setFocusInputValue(value)
    }

    const handleInputsNumberChange = (value: string) => {
        setNumberInputValue(Number(value))
    }

    const createInputs = () => {
        setNumberofInputs(numberInputValue)
    }

    React.useEffect(() => {
        placeFocus()
        }, [selectedFocus, numberOfInputs])

    React.useEffect(() => {
        const focus = localStorage.getItem('focus')
        setFocusInputValue(focus)
        setSelectedFocus(focus)
    }, [])

    React.useEffect(() => {
        // createInputArray(numberOfInputs)
    }, [numberOfInputs])

    console.log(selectedFocus)

    return (
    <React.Fragment>
        <div>
            <label >Number of inputs:</label>
            <input id='numberInput' value={numberInputValue} type="text" onChange={e => handleInputsNumberChange(e.target.value)}/>
            <button name='setNumberInput' onClick={createInputs}>Generate inputs</button>
        </div>
        <div>
            <label >Set focus on input:</label>
            <input id='focusInput' value={focusInputValue} type="text" onChange={e => handleChange(e.target.value)}/>
            <button name='setFocus' onClick={focusInput}>Set Focus</button>
        </div>

        {list.map((input, idx) => 
            <div>
                <label>Input with id = {idx + 1}</label>
                <input id={(idx + 1).toString()} ref={el => inputRef.current[input] = el}/>
            </div>
        )}
    </React.Fragment>
    )
}