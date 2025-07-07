import { FlatList, StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import { videos } from '../assets/data'
import VideoWrapper from '../components/VideoWrapper'

const { height: screenHeight } = Dimensions.get('window')

const HomeScreen = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const flatListRef = useRef(null)

    const onViewableItemsChanged = ({ viewableItems }: { viewableItems: Array<{ index: number | null }> }) => {
        if (viewableItems.length > 0 && viewableItems[0].index !== null) {
            setCurrentIndex(viewableItems[0].index)
        }
    }

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50
    }

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                keyExtractor={(item) => item.id.toString()}
                data={videos}
                renderItem={({ item, index }) => {
                    return (
                        <VideoWrapper
                            data={item}
                            isActive={index === currentIndex}
                            index={index}
                        />
                    )
                }}
                pagingEnabled
                horizontal={false}
                showsVerticalScrollIndicator={false}
                snapToInterval={screenHeight}
                snapToAlignment="start"
                decelerationRate="fast"
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                getItemLayout={(data, index) => ({
                    length: screenHeight,
                    offset: screenHeight * index,
                    index,
                })}
            />
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    }
})