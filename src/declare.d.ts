declare module "tinyfont" {
	const font: {};
	function initFont(font: font, ctx: CanvasRenderingContext2D | null): (text: string, x?: number, y?: number, size?: number, color?: string) => void;
	export = {
		font,
		initFont,
	}
}