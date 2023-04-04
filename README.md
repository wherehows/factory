# Purpose

This library is a collection of functions include helper and hooks that i made.

# Hooks
1. [**useIsDirty**](https://github.com/wherehows/factory/blob/main/apps/nextjs/hooks/useIsDirty.ts)

Monitor a state if it has been changed from it's original value or not. it can be used to display an alert modal that warns the user that any unsaved changes will be lost if they leave the page.

2. [**useBackspace**](https://github.com/wherehows/factory/blob/main/apps/nextjs/hooks/useBackspace.ts)

Set global states related to a backspace navigation


# Helpers
1. [**shouldNotForwardProp**](https://github.com/wherehows/factory/blob/main/apps/nextjs/utils/helpers.ts)

Create an object to use as the second parameter for the styled function in Emotion.

```javascript
const StyledComponent = styled('div', shouldNotForwardProp('isOn', 'isVisible'))(({ isOn, isVisible }) => ({
  backgroundColor: isOn ? 'black' : 'none',
  visibility: isVisible ? 'visible' : 'hidden'
}))
```
