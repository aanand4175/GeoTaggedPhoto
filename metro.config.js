const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const { wrapWithReanimatedMetroConfig } = require("react-native-reanimated/metro-config");
const { withNativeWind } = require("nativewind/metro");


const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;


const customConfig = {
  transformer: {
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== "svg"),
    sourceExts: [...sourceExts, "svg"],
  },
};

let mergedConfig = mergeConfig(defaultConfig, customConfig);


mergedConfig = withNativeWind(mergedConfig, { input: "./global.css" });

module.exports = wrapWithReanimatedMetroConfig(mergedConfig);
