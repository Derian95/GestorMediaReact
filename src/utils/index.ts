export const isVideo = (url: string) => {
    return (
        url.endsWith('.mp4') ||
        url.endsWith('.avi') ||
        url.endsWith('.mov') ||
        url.includes('youtube.com')
    )
}