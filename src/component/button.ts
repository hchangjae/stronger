import { Button } from 'kontra';

export type ButtonArgs = {
  text: string;
  fontSize?: number;
  onClick?: () => void;
};

const createButton = ({
  text,
  fontSize = 20,
  onClick = () => {
    console.log(`${text} clicked`);
  },
}: ButtonArgs) =>
  Button({
    text: {
      text,
      color: 'white',
      font: `${fontSize}px Arial, sans-serit`,
    },
    onDown: onClick,
  });

export default createButton;
