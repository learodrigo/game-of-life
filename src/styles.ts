import React from "react"

export const containerStyle = (square: number, gridSize: number): React.CSSProperties => {
    return {
        margin: '0 auto',
        width: square * gridSize
    }
}

export const controllersStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    left: 15,
    position: 'absolute',
    top: 15
}

export const styledButton: React.CSSProperties = {
    backgroundColor: 'lightblue',
    border: 0,
    borderRadius: 8,
    boxShadow: '4px 4px 2px rgba(0, 0, 0, 0.8)',
    cursor: 'pointer',
    marginBottom: 8,
    outline: 'none',
    padding: '4px 8px',
}

export const gridStyle = (square: number, gridSize: number): React.CSSProperties => {
    return {
        display: 'grid',
        gridTemplateColumns: `repeat(${gridSize}, ${square}px)`
    }
}

export const gridCellStyle = (square: number, grid: number): React.CSSProperties => {
    return {
        backgroundColor: grid ? 'pink' : 'white',
        border: '1px solid lightgrey',
        height: square,
        width: square
    }
}
