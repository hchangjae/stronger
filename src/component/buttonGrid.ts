import { Grid } from "kontra";

import createButton, { ButtonArgs } from "./button";

type ButtonGridOptions = {
  x: number;
  y: number;
}
const createButtonGrid = (buttons: ButtonArgs[], {x, y}: ButtonGridOptions) => 
  Grid({
    x,
    y,
    anchor: {x: 0, y: 0.5},
    rowGap: 15,
    colGap: 15,
    numCols: 4,
    flow: 'grid',
    children: buttons.map(button => createButton(button)),
  })

export default createButtonGrid;
