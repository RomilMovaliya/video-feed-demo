import { StyleSheet, Text, View, Dimensions, TouchableOpacity, PanResponder } from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import { VideoView, useVideoPlayer } from 'expo-video'

const { height: screenHeight, width: screenWidth } = Dimensions.get('window')

interface VideoWrapperProps {
    data: any
    isActive: boolean
    index: number
}

const VideoWrapper: React.FC<VideoWrapperProps> = ({ data, isActive, index }) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isPausedByLongPress, setIsPausedByLongPress] = useState(false)
    const videoRef = useRef(null)
    const longPressTimer = useRef<NodeJS.Timeout | null>(null)

    const player = useVideoPlayer(data.uri || data.url, (player) => {
        player.loop = true
        player.muted = false
    })

    useEffect(() => {
        if (isActive) {
            // Reset video to beginning when it becomes active
            player.currentTime = 0.5
            player.play()
            setIsPlaying(true)
        } else {
            player.pause()
            setIsPlaying(false)
        }
    }, [isActive, player])

    const handlePressIn = () => {
        longPressTimer.current = setTimeout(() => {
            if (isActive && isPlaying) {
                player.pause()
                setIsPlaying(false)
                setIsPausedByLongPress(true)
            }
        }, 200) // 200ms delay for long press
    }

    const handlePressOut = () => {
        if (longPressTimer.current) {
            clearTimeout(longPressTimer.current)
            longPressTimer.current = null
        }

        if (isPausedByLongPress) {
            player.play()
            setIsPlaying(true)
            setIsPausedByLongPress(false)
        }
    }

    return (
        <View style={styles.container}>
            <View
                style={styles.videoContainer}
                onTouchStart={handlePressIn}
                onTouchEnd={handlePressOut}
                onTouchCancel={handlePressOut}
            >
                <VideoView
                    ref={videoRef}
                    style={styles.video}
                    player={player}
                    allowsFullscreen={false}
                    allowsPictureInPicture={false}
                    contentFit="cover"
                    nativeControls={false}
                />
            </View>

            {/* Video Info Overlay */}
            <View style={styles.overlay}>
                <View style={styles.leftContainer}>
                    <Text style={styles.title}>{data.title}</Text>
                    <Text style={styles.description}>{data.description}</Text>
                </View>

                <View style={styles.rightContainer}>
                    <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.actionText}>❤️</Text>
                        <Text style={styles.actionCount}>{data.likes || '0'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.actionText}>💬</Text>
                        <Text style={styles.actionCount}>{data.comments || '0'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.actionText}>📤</Text>
                        <Text style={styles.actionCount}>Share</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default VideoWrapper

const styles = StyleSheet.create({
    container: {
        width: screenWidth,
        height: screenHeight,
        backgroundColor: '#000',
        position: 'relative',
    },
    videoContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    video: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        padding: 20,
        paddingBottom: 40,
        pointerEvents: 'box-none'
    },
    leftContainer: {
        flex: 1,
        paddingRight: 20,
    },
    title: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        color: '#fff',
        fontSize: 14,
        lineHeight: 20,
    },
    rightContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    actionButton: {
        alignItems: 'center',
        marginBottom: 20,
    },
    actionText: {
        fontSize: 24,
        marginBottom: 4,
    },
    actionCount: {
        color: '#fff',
        fontSize: 12,
        textAlign: 'center',
    },
})