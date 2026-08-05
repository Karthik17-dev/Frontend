import React from 'react';
import { createRoot } from 'react-dom/client';
import { PluginConnectDialog } from './components/PluginConnectDialog';
import { Slider } from './components/ui/slider';
import './index.css';

// 1. Mount PluginConnectDialog if container is present
const pluginDialogContainer = document.getElementById('plugin-dialog-root');
if (pluginDialogContainer) {
  const root = createRoot(pluginDialogContainer);
  root.render(React.createElement(PluginConnectDialog));
}

// 2. Mount Temperature Slider if container is present
const tempSliderContainer = document.getElementById('caTemperatureSliderRoot');
if (tempSliderContainer) {
  const root = createRoot(tempSliderContainer);
  root.render(
    React.createElement(Slider, {
      defaultValue: [0.7],
      min: 0,
      max: 2,
      step: 0.1,
      onValueChange: (value) => {
        const input = document.getElementById('caTemperatureInput');
        if (input) input.value = value[0];
      }
    })
  );
}
