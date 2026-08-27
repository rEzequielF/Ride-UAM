import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '@/constants/theme';
import { Text } from '@/constants/ui';
import { Ride } from '../types/ride.types';
import { RideStatusBadge } from './RideStatusBadge';

interface RideCardProps{
    ride: Ride;
    onPress?: () => void;
}

export const RideCard = ({ ride, onPress }: RideCardProps) => {
    const Container = onPress ? TouchableOpacity : View;

    return(
        <Container
        onPress={onPress}
        activeOpacity={0.7}
        style={styles.card}
        >
            {/* Cabecera: Conductor y Estado */}
            <View style={styles.header}>
                <View style={styles.driverInfo}>
                    <View style={styles.avatarPlaceholder}>
                        <Ionicons name="person-outline" size={16} color={COLORS.primary}/>
                    </View>
                    <View>
                        <Text variant="bodyBold">{ride.driver.fullName}</Text>
                        <View style={styles.ratingRow}>
                            <Ionicons name="star" size={12} color={COLORS.warning}/>
                            <Text variant="caption" color="textSecondary" style={styles.ratingText}>
                                {ride.driver.driverRating.toFixed(1)} ({ride.driver.totalRidesAsDriver} viajes)
                            </Text>
                        </View>
                    </View>
                    <RideStatusBadge status={ride.status}/>
                </View>

                <View style={styles.divider}/>

                {/* Ruta: Origen -> Destino */}
                <View style={styles.routeContainer}>
                    <View style={styles.routePoint}>
                        <Ionicons name="ellipse" size={10} color={COLORS.primary} style={styles.iconPoint}/>
                        <Text variant="bodyBold" style={styles.routeText} numberOfLines={1}>
                            {ride.origin}
                        </Text>
                    </View>
                    <View style={styles.routeLine}/>
                    <View style={styles.routePoint}>
                        <Ionicons name="location" size={12} color={COLORS.danger} style={styles.iconPoint}/>
                        <Text variant="bodyBold" style={styles.routeText} numberOfLines={1}>
                            {ride.destination}
                        </Text>
                    </View>
                </View>

                <View style={styles.divider}/>

                {/* Detalles: Fecha, Asientos, Precio */}
                <View style={styles.footer}>
                    <View style={styles.footerDetail}>
                        <Ionicons name="time-outline" size={14} color={COLORS.textSecondary}/>
                        <Text variant="caption" color="textSecondary" style={styles.footerText}>
                            {ride.vehicle.brand} {ride.vehicle.model}
                        </Text>
                    </View>

                    <View style={styles.footerRight}>
                        <Text variant="caption" color="textSecondary">
                            {ride.availableSeats} disp.
                        </Text>
                        <Text variant="bodyBold" color="primary" style={styles.priceText}>
                            C${ride.pricePerSeat}
                        </Text>
                    </View>
                </View>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    card:{
        backgroundColor: COLORS.background,
        borderRadius: RADIUS.md,
        padding: SPACING.md,
        marginBottom: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    driverInfo:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    avatarPlaceholder:{
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.surface,
        justifyContent: 'center',
        marginRight: SPACING.sm,
    },
    ratingRow:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    ratingText:{
        marginLeft: 4,
    },
    divider:{
        height: 1,
        backgroundColor: COLORS.border,
        marginVertical: SPACING.sm,
    },
    routeContainer:{
        paddingVertical: SPACING.xs / 2,
    },
    routePoint:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconPoint:{
        marginRight: SPACING.sm,
        width: 14,
        textAlign: 'center',
    },
    routeText:{
        flex: 1,
    },
    routeLine:{
        width: 1,
        height: 12,
        backgroundColor: COLORS.border,
        marginLeft: 6,
        marginVertical: 2,
    },
    footer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    footerDetail:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    footerText:{
        marginLeft: 4,
    },
    footerRight:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
    },
    priceText:{
        marginLeft: SPACING.xs,
    },
});