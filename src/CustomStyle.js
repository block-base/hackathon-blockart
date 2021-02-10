import React, { useRef } from 'react';
import Sketch from "react-p5";
import kanji from './kanji.json';

/*
Create your Custom style to be turned into a EthBlock.art Mother NFT

Basic rules:
 - use a minimum of 1 and a maximum of 4 "modifiers", modifiers are values between 0 and 1,
 - use a minimum of 1 and a maximum of 3 colors, the color "background" will be set at the canvas root
 - Use the block as source of entropy, no Math.random() allowed!
 - You can use a "shuffle bag" using data from the block as seed, a MersenneTwister library is provided

 Arguments:
  - block: the blockData, in this example template you are given 3 different blocks to experiment with variations, check App.js to learn more
  - mod[1-3]: template modifier arguments with arbitrary defaults to get your started
  - color: template color argument with arbitrary default to get you started

Getting started:
 - Write p5.js code, comsuming the block data and modifier arguments,
   make it cool and use no random() internally, component must be pure, output deterministic
 - Customize the list of arguments as you wish, given the rules listed below
 - Provide a set of initial /default values for the implemented arguments, your preset.
 - Think about easter eggs / rare attributes, display something different every 100 blocks? display something unique with 1% chance?

 - check out p5.js documentation for examples!
*/

// Logic
// choosing Kanji
// complex kanji with difficulty

// bgColor and textColor
// genesisblockはethereum color
// gradation text color if there are Maker transaction

// coordinate
// mod

let DEFAULT_SIZE = 500;
const CustomStyle = ({
  block,
  canvasRef,
  attributesRef,
  width,
  height,
  handleResize,
  mod1 = 0.75, // Example: replace any number in the code with mod1, mod2, or color values
  mod2 = 0.25,
  color1 = '#4f83f1',
  background = '#ccc',
}) => {
  const shuffleBag = useRef();
  const hoistedValue = useRef();

  const { hash } = block;

  // setup() initializes p5 and the canvas element, can be mostly ignored in our case (check draw())
  const setup = (p5, canvasParentRef) => {
    // Keep reference of canvas element for snapshots
    let _p5 = p5.createCanvas(width, height).parent(canvasParentRef);
    canvasRef.current = p5;
    p5.textFont("Sawarabi Mincho");
    p5.noLoop()

    attributesRef.current = () => {
      return {
        // This is called when the final image is generated, when creator opens the Mint NFT modal.
        // should return an object structured following opensea/enjin metadata spec for attributes/properties
        // https://docs.opensea.io/docs/metadata-standards
        // https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md#erc-1155-metadata-uri-json-schema

        attributes: [
          {
            display_type: 'number',
            trait_type: 'your trait here number',
            value: hoistedValue.current, // using the hoisted value from within the draw() method, stored in the ref.
          },

          {
            trait_type: 'your trait here text',
            value: 'replace me',
          },
        ],
      };
    };
  };

  // draw() is called right after setup and in a loop
  // disabling the loop prevents controls from working correctly
  // code must be deterministic so every loop instance results in the same output

  // Basic example of a drawing something using:
  // a) the block hash as initial seed (shuffleBag)
  // b) individual transactions in a block (seed)
  // c) custom parameters creators can customize (mod1, color1)
  // d) final drawing reacting to screen resizing (M)
  
  const draw = (p5) => {
    let coordinate = p5.random (5,25)
    let randomN = p5.int(p5.random(3,6))
    let angle = p5.PI/ randomN
    let col = {
      r: p5.random(0,255),
      g: p5.random(0,255),
      b: p5.random(0,255),
    }
    let kanjiIndex = p5.int(p5.random(0,2994))
    p5.background(col.r,col.g,col.b, 50);
    p5.textSize(120)
    p5.translate(height/2, width/2);
    for(var i = 0; i < randomN*3 ; i++){
      p5.fill(80)
      p5.rotate(angle)
      p5.text(kanji[kanjiIndex], coordinate, coordinate)
    }
    p5.rotate(p5.PI)
    p5.fill(col.r, col.g, col.b)
    p5.text(kanji[kanjiIndex], coordinate, coordinate)
  };

  return <Sketch setup={setup} draw={draw} windowResized={handleResize} />;
};

export default CustomStyle;

const styleMetadata = {
  name: '',
  description: '',
  image: '',
  creator_name: '',
  options: {
    mod1: 0.4,
    mod2: 0.1,
    color1: '#fff000',
    background: '#000000',
  },
};

export { styleMetadata };
