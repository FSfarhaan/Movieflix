import MovieCard from "@/components/MovieCard";
import Searchbar from "@/components/Searchbar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { Link, useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import { account } from "@/services/appwrite";
import { useEffect, useState } from "react";
import TrendingCard from "@/components/TrendingCard";

export default function Index() {
  const router = useRouter();
  const {
    data: movies,
    loading,
    error,
  } = useFetch(() => fetchMovies({ query: "" }));

  const [trendingMovies, setTrendingMovies] = useState([]);

  // useEffect(() => {
  //   account.createAnonymousSession()
  //     .then((res) => {
  //       console.log('✅ Anonymous session created:', res);
  //     })
  //     .catch((err) => {
  //       console.error('❌ Anonymous session failed:', err.message);
  //     });
  // }, []);

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {loading ? (
          <ActivityIndicator
            size={"large"}
            color={"#0000ff"}
            className="mt-10 self-center"
          />
        ) : error ? (
          <Text className="text-white">Error {error?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <Searchbar
              onPress={() => router.push("/search")}
              placeholder="Search for a movie"
              value=""
              onChangeText={() => {}}
            />

            <>
              <View className="mt-10">
                <Text className="text-lg text-white font-bold mb-3">
                  Trending Movies
                </Text>
              </View>

              <FlatList
                horizontal
                data={movies?.slice(0, 5)}
                // @ts-ignore
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                  <TrendingCard movie={item} index={index} />
                )}
                showsHorizontalScrollIndicator={false}
              />
            </>

            <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Latest Movies
              </Text>
              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  marginBottom: 10,
                  paddingRight: 5,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
