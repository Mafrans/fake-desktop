import { css, html, LitElement } from "lit";
import { customElement } from "lit-element";
import { FontFactory } from "../models/classes/FontFactory";

@customElement("x-app")
export class XApp extends LitElement {
  static styles = css``;

  constructor() {
    super();
    const fontFactory = new FontFactory();
    console.time();
    fontFactory.cacheFonts().then(() => {
      console.log(`${fontFactory.fonts.length} fonts cached.`);
      console.time();
    });
  }

  render() {
    return html``;
  }
}
