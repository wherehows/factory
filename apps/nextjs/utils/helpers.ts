/**
 * Create an object to use as the second parameter for the styled function in Emotion.
 * 
 * This function relieve us of the trouble of making object for transfering information about shouldForwardProp.
 * if you wanna know about shouldForwardProp, See
 * {@link https://emotion.sh/docs/styled#customizing-prop-forwarding}
 * 
 * @example **isOn prop shouldNotForwardProp**
 * ```javascript
 * styled('div', shouldNotForwardProp('isOn'))(({ isOn }) => ({
 * backgroundColor: isOn ? 'black' : 'none';
 * }))
 * ```
 */
export const shouldNotForwardProp = (...args: string[]) => ({
  shouldForwardProp: (propName: string) => !args.includes(propName)
});