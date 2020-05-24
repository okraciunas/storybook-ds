import React from "react";
import ReactDOM from "react-dom";

import { Link } from "./";

const LinkWrapper = (props) => <a {...props} />; // eslint-disable-line jsx-a11y/anchor-has-content

describe("Link", () => {
  it("has a href attribute when rendering with linkWrapper", () => {
    const div = document.createElement("div");
    const href = "http://www.okraciunas.com";
    const text = "Link text";

    ReactDOM.render(
      <Link href={href} LinkWrapper={LinkWrapper}>
        {text}
      </Link>,
      div
    );

    expect(div.querySelector(`a[href="${href}"]`)).not.toBeNull();
    expect(div.textContent).toEqual(text);

    ReactDOM.unmountComponentAtNode(div);
  });
});
