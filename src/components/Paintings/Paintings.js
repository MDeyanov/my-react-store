import React from "react";
import { PaintingItem } from "./PaintingItem/PaintingItem";

export const Paintings = ({
    paintings,
}) => {
    return (
        <section id="paintings-page">
            <h1>All Paintings</h1>

            {paintings.map(x =>
                <PaintingItem key={x._id} {...x} />
            )}

            {paintings.length === 0 && (
                <h3 className="no-paintings">No paintings yet</h3>
            )}
        </section>
    );
}