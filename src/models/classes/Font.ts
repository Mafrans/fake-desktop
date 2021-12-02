import { FontStyle } from "src/models/enums/FontStyle";
import { FontWeight } from "src/models/enums/FontWeight";

export class Font {
  public family: string;
  public styles: FontStyle[];
  public weights: FontWeight[];

  constructor(family: string, styles: FontStyle[], weights: FontWeight[]) {
    this.family = family;
    this.styles = styles;
    this.weights = weights;
  }
}
