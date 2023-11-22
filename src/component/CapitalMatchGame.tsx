import { useState } from "react";


type ButtonState = "DEFAULT" | "SELECTED" | "WRONG";
type Option = {
    value: string,
    state: ButtonState
}

function randomize() {
    return Math.random() - 0.5
}
function getCountries(data: Record<string, string>) {
    return Object.keys(data)
}

function getCapitals(data: Record<string, string>) {
    return Object.values(data)
}

function isPartOfPair(opt: Option, selected: Option, option: Option) {
    return (opt.value === selected.value || opt.value === option.value)
}


export default function CountryCapitalGame({ data }: { data: Record<string, string> }) {
    const fullData = Object.keys(data).length + Object.values(data).length + 4

    const [wrongCount, setWrongCount] = useState(3);

    const [options, setOptions] = useState<Option[]>(
        [...getCountries(data), ...getCapitals(data)]
            .sort(randomize)
            .map(value => ({ value, state: "DEFAULT" }))
    )
    const [selected, setSelected] = useState<Option>()

    const isGameOver = options.length === 0;
    const restart = () => {
        setWrongCount(3)
        setOptions([...getCountries(data), ...getCapitals(data)].sort(randomize).map(value => ({ value, state: "DEFAULT" })))

    }

    function getButtonClass(option: Option) {
        if (option.state === "SELECTED") {
            return 'selected'
        } else if (option.state === "WRONG") {
            return 'wrong'
        } else {
            return ''
        }
    }


    function buttonHandling(option: Option) {
        //setMoveCount(moveCount + 1)
        if (!selected) {
            setSelected(option);
            setOptions(
                options.map((opt) => ({ ...opt, state: opt === option ? "SELECTED" : "DEFAULT" }))
            )
        } else {
            const capital = data[option.value];
            const selectedCapital = data[selected.value]
            if (selected.value === capital || selectedCapital === option.value) {
                setOptions(options.filter(opt => !isPartOfPair(opt, option, selected)))
            } else {//yanlış eşlesirse
                setWrongCount(wrongCount - 1)
                setOptions(
                    options.map(opt => ({
                        ...opt,
                        state: isPartOfPair(opt, option, selected) ? "WRONG" : opt.state,
                    }))
                )
            }
            setSelected(undefined)
        }
    }


    function textType(type: string, win: number) {
        return (
            <div className={win == 1 ? 'zolo' : 'nozolo'}>
                <h1>{type}</h1>
                <button className="restart" onClick={restart}>Tekrar Oyna</button>
            </div>
        )
    }
    if (wrongCount === 0) {
        const a = textType("başaramadın TEKRAR DENE", 0)
        return a
    }
    if (isGameOver) {
        const a = textType("Kazandın!", 1)
        return a

    }


    return (
        <>
            <h1 style={{ color: 'red' }}>{wrongCount} yanlış yapma sansın var</h1>
            <p className="deli">en fazla <span className="kalin">{fullData}</span> hamlede bitirmelisin </p>
            {options.map((option) => (
                <button
                    className={getButtonClass(option)}
                    key={option.value}
                    onClick={() => buttonHandling(option)}>
                    {option.value}
                </button>
            ))
            }</>
    )
}
