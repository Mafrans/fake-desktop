import { FontStyle } from "../enums/FontStyle";
import { FontWeight } from "../enums/FontWeight";
import { FontData } from "../interfaces/FontData";
import { Font } from "./Font";

const styleMatcher = /^([1-9][0-9]{2})(regular|italic)$/;

export class FontFactory {
  public fonts: Font[] = [];

  private async fetchFonts(path: string) {
    const response = await fetch(path);
    const data: FontData[] = await response.json();

    this.fonts = data.map(this.parseFontData);
  }

  private parseFontData({ family, variants }: FontData) {
    const weights: FontWeight[] = [];
    const styles: FontStyle[] = [];

    for (const variant of variants) {
      const [_, weight, style] = styleMatcher.exec(variant) ?? [];
      if (weight && !weights.includes(parseInt(weight))) {
        weights.push(parseInt(weight) as FontWeight);
      }
      if (style && !styles.includes(style as FontStyle)) {
        styles.push(style as FontStyle);
      }
    }

    return new Font(family, styles, weights);
  }

  public getFontByFamily(family: string) {
    return this.fonts.find((font) => font.family === family);
  }

  public getFontsWithWeight(weight: FontWeight) {
    return this.fonts.filter((font) => font.weights.includes(weight));
  }

  public getFontsWithStyle(style: FontStyle) {
    return this.fonts.filter((font) => font.styles.includes(style));
  }

  public searchFonts(query: string) {
    return this.fonts.filter((font) =>
      font.family.toLowerCase().includes(query.toLowerCase())
    );
  }

  public async cacheFonts(force?: boolean) {
    if (this.fonts.length === 0 || force) {
      this.fonts = [];
      await this.fetchFonts("/fonts.json");
    }
  }
}
