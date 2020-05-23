import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { APPEARANCES, SIZES } from "./constants";

import Text from "./styles/Text.styled";
import Loading from "./styles/Loading.styled";
import StyledButton from "./styles/StyledButton.styled";

const ButtonLink = StyledButton.withComponent("a");

const applyStyle = (ButtonWrapper) => {
  return (
    ButtonWrapper &&
    StyledButton.withComponent(
      ({ containsIcon, isLoading, isUnclickable, ...rest }) => (
        <ButtonWrapper {...rest} />
      )
    )
  );
};

export function Button({
  isDisabled,
  isLoading,
  loadingText,
  isLink,
  children,
  ButtonWrapper,
  ...props
}) {
  const buttonInner = (
    <Fragment>
      <Text>{children}</Text>
      {isLoading && <Loading>{loadingText || "Loading..."}</Loading>}
    </Fragment>
  );

  const StyledButtonWrapper = React.useMemo(() => applyStyle(ButtonWrapper), [
    ButtonWrapper,
  ]);

  let SelectedButton = StyledButton;
  if (ButtonWrapper) {
    SelectedButton = StyledButtonWrapper;
  } else if (isLink) {
    SelectedButton = ButtonLink;
  }

  return (
    <SelectedButton isLoading={isLoading} disabled={isDisabled} {...props}>
      {buttonInner}
    </SelectedButton>
  );
}

Button.propTypes = {
  isLoading: PropTypes.bool,
  /**
   When a button is in the loading state you can supply custom text
  */
  loadingText: PropTypes.node,
  /**
   Buttons that have hrefs should use <a> instead of <button>
  */
  isLink: PropTypes.bool,
  children: PropTypes.node.isRequired,
  appearance: PropTypes.oneOf(Object.values(APPEARANCES)),
  isDisabled: PropTypes.bool,
  /**
   Prevents users from clicking on a button multiple times (for things like payment forms)
  */
  isUnclickable: PropTypes.bool,
  /**
   Buttons with icons by themselves have a circular shape
  */
  containsIcon: PropTypes.bool,
  size: PropTypes.oneOf(Object.values(SIZES)),
  ButtonWrapper: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

Button.defaultProps = {
  isLoading: false,
  loadingText: null,
  isLink: false,
  appearance: APPEARANCES.TERTIARY,
  isDisabled: false,
  isUnclickable: false,
  containsIcon: false,
  size: SIZES.MEDIUM,
  ButtonWrapper: undefined,
};
