import { Button } from 'kontra';

export type ButtonArgs = {
  text: string;
  price?: number;
  fontSize?: number;
  onClick?: () => void;
};

const createButton = ({
  text,
  price = 0,
  fontSize = 20,
  onClick = () => {
    console.log(`${text} clicked`);
  },
}: ButtonArgs) =>
  Button({
    text: {
      text: `${text}\n$${price}`,
      color: 'white',
      font: `${fontSize}px Arial, sans-serit`,
      textAlign: 'center',
    },
    onDown: onClick,
  });

export default createButton;
