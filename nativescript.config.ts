import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'org.nativescript.sportify',
  appPath: 'src',
  appResourcesPath: 'App_Resources',
  useLegacyWorkflow: false,
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none'
  }
} as NativeScriptConfig;
