import { StatusBar } from "expo-status-bar";
import {
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { PRODUCT_LIST } from "../../data/productList";
import { useRef } from "react";
import Svg, { Defs, RadialGradient, Stop, Rect } from "react-native-svg";
const { width, height } = Dimensions.get("window");

export default function App() {
  const _scrollX = useRef(new Animated.Value(0)).current;

  const renderItem = (item: any, i: any) => {
    const inputRange = [
      (i - 2) * width,
      (i - 1) * width,
      i * width,
      (i + 1) * width,
    ];

    const imageScale = _scrollX.interpolate({
      inputRange,
      outputRange: [1, 0.4, 1, 0.4],
      extrapolate: "clamp",
    });

    const imageOpacity = _scrollX.interpolate({
      inputRange,
      outputRange: [1, 0.2, 1, 0.2],
    });

    return (
      <View key={item.id} style={[styles.container, styles.item]}>
        <Animated.Image
          source={{ uri: item.imageUrl }}
          style={[
            styles.image,
            {
              transform: [{ scale: imageScale }],
              opacity: imageOpacity,
            },
          ]}
          onError={() => console.log(`Error loading image for id: ${item.id}`)}
          fadeDuration={0}
        />
        <Animated.View
          style={[styles.metaContainer, { opacity: imageOpacity }]}
        >
          <Text style={[styles.font, styles.title]}>{item.title}</Text>
          <Text style={[styles.font, styles.subtitle]}>{item.subtitle}</Text>
          <Text style={[styles.font, styles.description]}>
            {item.description}
          </Text>
          <Text style={[styles.font, styles.price]}>{item.price}</Text>
        </Animated.View>
        {_renderRadialGradient(item.bg, i)}
      </View>
    );
  };

  const _renderRadialGradient = (color: any, i: any) => {
    const inputRange = [
      (i - 2) * width,
      (i - 1) * width,
      i * width,
      (i + 1) * width,
    ];

    const rotate = _scrollX.interpolate({
      inputRange,
      outputRange: ["0deg", "-15deg", "0deg", "15deg"],
    });

    const translateX = _scrollX.interpolate({
      inputRange,
      outputRange: [0, width, 0, -width],
    });

    const opacity = _scrollX.interpolate({
      inputRange,
      outputRange: [1, 0.5, 1, 0.5],
    });

    return (
      <Animated.View
        style={[
          styles.svgContainer,
          {
            transform: [{ rotate }, { translateX }, { scale: 1.3 }],
            opacity: opacity,
          },
        ]}
      >
        <Svg height={height} width={width}>
          <Defs>
            <RadialGradient
              id="gradient"
              cx="50%"
              cy="35%"
              r="60%"
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset="0%" stopColor="#fff" stopOpacity="1" />
              <Stop offset="100%" stopColor={color} stopOpacity="1" />
            </RadialGradient>
          </Defs>
          <Rect
            x="0"
            y="0"
            width={width}
            height={height}
            fill="url(#gradient)"
            fillOpacity={0.9}
          />
        </Svg>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <Animated.ScrollView
        pagingEnabled
        scrollEventThrottle={16}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: _scrollX } } }],
          { useNativeDriver: true }
        )}
        contentContainerStyle={styles.contentContainer}
      >
        {PRODUCT_LIST.map(renderItem)}
      </Animated.ScrollView>
      <StatusBar hidden />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    width,
    height,
    alignItems: "center",
  },
  font: {
    fontFamily: "menlo",
    color: "#222",
  },
  metaContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "transparent",
    padding: 15,
  },
  title: {
    fontSize: 40,
    fontWeight: "900",
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "900",
  },
  description: {
    fontSize: 16,
    marginVertical: 15,
    textAlign: "center",
  },
  price: {
    fontSize: 45,
    fontWeight: "400",
  },
  logo: {
    position: "absolute",
    top: 60,
    width: width / 7,
    height: width / 7,
    resizeMode: "contain",
    zIndex: 1000,
  },
  image: {
    width: width * 0.95,
    height: width * 0.95,
    resizeMode: "contain",
  },
  svgContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height,
    zIndex: -2,
    backgroundColor: "transparent",
  },
});
