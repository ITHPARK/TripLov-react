import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import { HotelProps } from '@models/hotel'
import styled from '@emotion/styled'

const Map = ({ location }: { location: HotelProps['location'] }) => {
    const {
        directions,
        pointGeolocation: { x, y },
    } = location

    const { isLoaded } = useJsApiLoader({
        id: 'google-map',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY as string,
    })

    if (isLoaded === false) {
        return null
    }

    return (
        <MapContainer direction="column">
            <Text typography="t4" bold={true}>
                기본 정보
            </Text>
            <GoogleMap
                mapContainerStyle={{
                    //지도 스타일
                    width: '100%',
                    height: '250px',
                    borderRadius: '5px',
                }}
                center={
                    //지도가 나타낼 위치
                    { lat: y, lng: x }
                }
                zoom={15}
            >
                <Marker position={{ lat: y, lng: x }} />
            </GoogleMap>
            <Text typography="t6">{location.directions}</Text>
        </MapContainer>
    )
}

const MapContainer = styled(Flex)`
    padding: 24px;
`

export default Map
