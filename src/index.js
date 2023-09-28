import 'react-app-polyfill/stable';
import React from 'react';
import { createRoot } from 'react-dom/client';

import Root from 'components/Root';

createRoot(document.getElementById('root')).render(<Root />);
