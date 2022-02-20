import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View, Pressable } from "react-native";

const Colors = {
  primary: "#642CA9",
  secondary: "#FF36AB",
  back: "#DAA588",
  front: "#9CF6F6",
};

const types = [
  "education",
  "recreational",
  "social",
  "diy",
  "charity",
  "cooking",
  "relaxation",
  "music",
  "busywork",
];

export default function App() {
  const [activity, setActivity] = useState("");
  const [type, setType] = useState("random");
  const [random, setrandom] = useState(false);
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    fetch("http://www.boredapi.com/api/activity/", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setActivity(data.activity));
    setType("random");
  }, [random]);

  useEffect(() => {
    fetch(`http://www.boredapi.com/api/activity?type=${types[selected]}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setActivity(data.activity));
    setType(types[selected]);
  }, [selected]);

  const Item = (props) => (
    <View style={styles.lItem}>
      <Pressable onPress={props.onPress}>
        <Text style={styles.ltext}>{props.text}</Text>
      </Pressable>
    </View>
  );
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.txt}>Bored App!</Text>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={types}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <Item text={item} onPress={() => setSelected(index)} />
          )}
        />
      </View>

      <View style={styles.body}>
        <View style={styles.activitySection}>
          <Text style={styles.titletxt}> Activity:{type}</Text>
          <Text style={styles.activity}> {activity}</Text>
        </View>

        <View style={styles.buttons}>
          <Pressable
            style={[styles.button, { backgroundColor: Colors.secondary }]}
            onPress={() => {
              setrandom((prev) => !prev);
            }}
          >
            <Text style={styles.text}>Get Random </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  title: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 10,
  },
  txt: {
    fontSize: 35,
    color: "#000",
    paddingVertical: 10,
    fontWeight: "700",
  },
  listContainer: {
    width: "100%",
    paddingVertical: 10,
  },
  lItem: {
    width: 100,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 3,
    borderColor: Colors.primary,
    borderWidth: 2,
    borderRadius: 10,
  },
  ltext: {
    fontWeight: "700",
    fontSize: 16,
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  activitySection: {
    position: "absolute",
    top: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  titletxt: {
    fontSize: 25,
    fontWeight: "700",
    paddingVertical: 20,
  },
  activity: {
    fontSize: 20,
    fontWeight: "600",
  },
  buttons: {
    position: "absolute",
    bottom: 0,
    width: "100%",

    padding: 10,
  },
  button: {
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
    textTransform: "uppercase",
    color: "#000",
  },
});
