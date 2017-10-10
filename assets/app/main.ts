//code thats executed first when the bundle.js file is imported and run
import './polyfills';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from "./app.module";

platformBrowserDynamic().bootstrapModule(AppModule);
