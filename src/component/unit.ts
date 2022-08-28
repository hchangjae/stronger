import { Sprite } from "kontra"

export type CreateUnitProps = {
  scale: number;
  speed: number;
  x?: number;
  y?: number;
  color?: string;
}

export const createUnit = (props: CreateUnitProps) => {
  const {scale, speed, x, y, color} = props
  return Sprite({
    width: scale,
    height: scale,
    dx: speed,
    x,
    y,
    color,
  })
}

