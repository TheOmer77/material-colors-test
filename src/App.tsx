import { useMemo, useState } from 'react';

import ColorGrid from './components/ColorGrid';
import Color from './components/Color';
import useTonalPalette from './hooks/useTonalPalette';
import { getNeutralVariantHex, randomHexColor } from './utils/colorUtils';
import { initialBaseColor, tones } from './constants';

const App = () => {
  const [baseColor, setBaseColor] = useState(initialBaseColor);
  const [sliderTone, setSliderTone] = useState(40);

  const neutralVariant = useMemo(
    () => getNeutralVariantHex(baseColor),
    [baseColor]
  );

  const [getTone] = useTonalPalette(baseColor),
    [getNeutralTone] = useTonalPalette(neutralVariant);

  return (
    <>
      <h1>Material tonal palette test</h1>

      <h2>Base color</h2>
      <ColorGrid>
        <Color
          input
          value={baseColor}
          onChange={event => setBaseColor(event.target.value)}
        />
        <div>
          <button onClick={() => setBaseColor(randomHexColor())}>
            Generate random color
          </button>
        </div>
      </ColorGrid>

      <h2>Tones</h2>
      <ColorGrid marginBottom>
        {tones.map(tone => (
          <Color key={tone} value={getTone(tone) as string} />
        ))}
      </ColorGrid>
      <ColorGrid>
        {tones.map(tone => (
          <Color key={tone} value={getNeutralTone(tone) as string} />
        ))}
      </ColorGrid>

      <h2>Can I have any custom tone?</h2>
      <ColorGrid>
        <Color value={getTone(sliderTone) as string} />
        <Color value={getNeutralTone(sliderTone) as string} />
        <div>
          <label htmlFor='tone-slider'>Tone: {sliderTone}</label>
          <input
            id='tone-slider'
            type='range'
            min={0}
            max={100}
            value={sliderTone}
            onChange={event => setSliderTone(parseInt(event.target.value))}
            style={{ accentColor: getTone(50) as string }}
          />
        </div>
      </ColorGrid>
    </>
  );
};

export default App;
