import React, { useCallback, useRef, useState } from 'react'
import produce from 'immer'

import {
    containerStyle,
    controllersStyle,
    styledButton,
    gridStyle,
    gridCellStyle
} from './styles'

const gridSize = 20
const square = Math.floor(window.innerHeight / gridSize)

const operations = [
    [0, 1], [0, -1],
    [1, -1], [-1, 1],
    [1, 1], [-1, -1],
    [1, 0], [-1, 0]
]

const App: React.FC = () => {
    const [running, setRunning] = useState(false)
    const runningRef = useRef(running)
    runningRef.current = running

    const generateGrid = () => Array(gridSize).fill(Array(gridSize).fill(0))

    const [grid, setGrid] = useState(() => {
        return generateGrid()
    })

    const computeNeighbors = (i: number, j: number, g: number[][]) => {
        let neighbors = 0

        // TODO: Reduce this instead
        operations.forEach(([x, y]) => {
            const newI = i + x
            const newJ = j + y

            if (newI >= 0 && newI < gridSize && newJ >= 0 && newJ < gridSize) {
                neighbors += g[newI][newJ]
            }
        })

        return neighbors
    }

    const runSimulation = useCallback(() => {
        if (!runningRef.current) {
            setRunning(false)
            return
        }

        // Actual logic
        setGrid((g) => {
            return produce(g, gridCopy => {
                for (let i = 0; i < gridSize; i++) {
                    for (let j = 0; j < gridSize; j++) {
                        let neighbors = computeNeighbors(i, j, g)

                        // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
                        // Any live cell with more than three live neighbours dies, as if by overpopulation.
                        if (neighbors < 2 || neighbors > 3) {
                            gridCopy[i][j] = 0
                        }
                        // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
                        else if (!g[i][j] && neighbors === 3) {
                            gridCopy[i][j] = 1
                        }
                    }
                }
            })
        })

        setTimeout(runSimulation, 500)
    }, [])

    const handleStart = () => {
        setRunning(!running)

        if (!running) {
            runningRef.current = true
            runSimulation()
        }
    }

    const handleClear = () => {
        setRunning(false)
        setGrid(generateGrid())
    }

    const handleRandom = () => {
        const rows = grid.map(ele =>
            ele.map(
                () => Math.random() > 0.5 ? 1 : 0)
            )

        setGrid(rows)
    }

    const handleGridCell = (i: number, j: number) => {
        return () => {
            const newGrid = produce(grid, gridCopy => {
                gridCopy[i][j] = grid[i][j] ? 0 : 1
            })

            setGrid(newGrid)
        }
    }

    const buttonStyle = {
        ...styledButton,
        opacity: running ? 0.4 : 0.8
    }

    return (
        <div style={containerStyle(square, gridSize)}>
            <div style={controllersStyle}>
                <button
                    id='startButton'
                    onClick={handleStart}
                    style={buttonStyle}
                >
                    {running ? 'Stop' : 'Start'}
                </button>

                <button
                    onClick={handleClear}
                    style={buttonStyle}
                >
                    Clear
                </button>

                <button
                    onClick={handleRandom}
                    style={buttonStyle}
                >
                    Random
                </button>
            </div>

            <div style={gridStyle(square, gridSize)}>
                {grid.map((rows: number[], i) =>
                    rows.map((col: number, j) => {
                        const tempHandler = handleGridCell(i, j)

                        return (
                            <div
                                key={`${i}-${j}`}
                                onClick={tempHandler}
                                style={gridCellStyle(square, grid[i][j])}
                            />
                        )
                    })
                )}
            </div>
        </div>
    )
}

export default App
