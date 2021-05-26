import * as React from 'react'

export const FocusInput = (props: any) => {
    const inputRef = React.useRef([])
    const focusInputRef = React.useRef(null)

    const [selectedFocus, setSelectedFocus] = React.useState<string>('')
    const [focusInputError, setFocusInputError] = React.useState<string>(null)

    const focusInput = () => {
        var error = validateInput(focusInputRef.current.value)
        setFocusInputError(error)
        if(!error) {
            setSelectedFocus(focusInputRef.current.value)
            localStorage.setItem('focus', focusInputRef.current.value)
        }
    }

    const placeFocus = () => {
        const selectedFocusNumber = Number(selectedFocus) - 1
        if(inputRef.current[selectedFocusNumber]) inputRef.current[selectedFocusNumber].focus()
    }
    
    const validateInput = (value: any) : string => {
        if(isNaN(value)) {
            return 'Input value must be a number!'
        }
        let numberValue = Number(value)
        if(numberValue <= 0 || numberValue > 3)
            return 'Number should be in range of input number!' 
        return null
    }

    React.useEffect(() => {
        placeFocus()
    }, [selectedFocus])

    React.useEffect(() => {
        const focus = localStorage.getItem('focus')
        focusInputRef.current.value = focus
        setSelectedFocus(focus)
    }, [])

    return (
    <React.Fragment>
        <div>
            <label >Set focus on input:</label>
            <input id='focusInput' ref={focusInputRef} type="text" />
            <button name='setFocus' onClick={focusInput}>Set Focus</button>
            {focusInputError && <label style={{color: 'red'}}>{focusInputError}</label>}
        </div>
        <div>
            <label >Input with id = 1</label>
            <input ref={el => inputRef.current[0] = el}/>
        </div>
        <div>
            <label >Input with id = 2</label>
            <input ref={el => inputRef.current[1] = el}/>
        </div>
        <div>
            <label >Input with id = 3</label>
            <input ref={el => inputRef.current[2] = el}/>
        </div>
    </React.Fragment>
    )
}