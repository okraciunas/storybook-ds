import React from "react";
import { addDecorator } from "@storybook/react";
import { withA11Y } from "@storybook/addon-a11y";

import { GlobalStyle } from "./../src/shared/global";

addDecorator(withA11Y);

addDecorator((story) => (
  <>
    <GlobalStyle />
    {story()}
  </>
));
