import React, { useState } from "react";

const DragAndDrop = ({ id, label }) => {
    const onDragStart = (e) => {
        e.dataTransfer.setData("text/plain", id); // Zapisujemy dane, które będą przekazane podczas przeciągania
        console.log(`Item ${id} is being dragged`);
    };

    return (
        <div
            id={id}
            draggable
            onDragStart={onDragStart} // Przypisanie funkcji do onDragStart
            style={{
                padding: "10px",
                backgroundColor: "lightblue",
                cursor: "move",
            }}
        >
            {label}
        </div>
    );
};

const DropZone = () => {
    const onDrop = (e) => {
        e.preventDefault();
        const draggedItemId = e.dataTransfer.getData("text/plain");
        console.log(`Dropped item with id: ${draggedItemId}`);
    };

    const onDragOver = (e) => {
        e.preventDefault();
    };

    return (
        <div
            onDrop={onDrop}
            onDragOver={onDragOver}
            style={{
                border: "2px dashed #ccc",
                height: "200px",
                marginTop: "20px",
                textAlign: "center",
                lineHeight: "200px",
            }}
        >
            Drop here
        </div>
    );
};

const DragAndDropExample = () => {
    return (
        <div>
            <h1>Drag and Drop Example</h1>
            <div style={{ display: "flex", gap: "10px" }}>
                <DragAndDrop id="item1" label="Item 1" />
                <DragAndDrop id="item2" label="Item 2" />
                <DragAndDrop id="item3" label="Item 3" />
            </div>
            <DropZone />
        </div>
    );
};

export default DragAndDropExample;
