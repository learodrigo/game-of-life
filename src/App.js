import React, { useState } from 'react'
import produce from 'immer'

const numRows = 50
const numCols = 50

const App: React.FC = () => {
    const [grid, setGrid] = useState(() => {
        const rows = []

        for (let i = 0; i < numRows; i++) {
            rows.push(Array.from(Array(numCols), () => 0))
        }

        return rows
    })

    return <>
        <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${numCols}, 20px)`
        }}>
            {grid.map((rows, i) =>
                rows.map((col, j) => (
                    <div
                        key={`${i}-${j}`}
                        onClick={() => {
                            const newGrid = produce(grid, gridCopy => {
                                gridCopy[i][j] = !grid[i][j]
                            })

                            setGrid(newGrid)
                        }}
                        style={{
                            backgroundColor: grid[i][j] ? 'pink' : 'white',
                            border: '1px solid lightgrey',
                            height: 20,
                            width: 20
                        }}
                    />
                ))
            )}
        </div>
    </>
}

export default App
