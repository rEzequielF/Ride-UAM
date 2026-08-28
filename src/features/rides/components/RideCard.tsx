import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '@/constants/theme';
import { Text } from '@/constants/ui';
import { Ride } from '../types/ride.types';
import { RideStatusBadge } from './RideStatusBadge';

interface RideCardProps {
    ride: Ride;
    onPress?: () => void;
}

export const RideCard = ({ ride, onPress }: RideCardProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={!onPress}
            activeOpacity={onPress ? 0.7 : 1}
            accessibilityRole={onPress ? 'button' : undefined}
            accessibilityLabel={
                onPress
                    ? `Ride de ${ride.origin} a ${ride.destination}`
                    : undefined
            }
            style={styles.card}
        >
            {/* Conductor y estado */}
            <View style={styles.header}>
                <View style={styles.driverInfo}>
                    <View style={styles.avatarPlaceholder}>
                        <Ionicons
                            name="person-outline"
                            size={16}
                            color={COLORS.primary}
                        />
                    </View>

                    <View style={styles.driverTextContainer}>
                        <Text variant="bodyBold" numberOfLines={1}>
                            {ride.driver.fullName}
                        </Text>

                        <View style={styles.ratingRow}>
                            <Ionicons
                                name="star"
                                size={12}
                                color={COLORS.warning}
                            />
                            <Text
                                variant="caption"
                                color="textSecondary"
                                style={styles.ratingText}
                            >
                                {ride.driver.driverRating.toFixed(1)} (
                                {ride.driver.totalRidesAsDriver} viajes)
                            </Text>
                        </View>
                    </View>
                </View>

                <RideStatusBadge status={ride.status} />
            </View>

            <View style={styles.divider} />

            {/* Ruta */}
            <View style={styles.routeContainer}>
                <View style={styles.routePoint}>
                    <Ionicons
                        name="ellipse"
                        size={10}
                        color={COLORS.primary}
                        style={styles.iconPoint}
                    />
                    <Text
                        variant="bodyBold"
                        style={styles.routeText}
                        numberOfLines={1}
                    >
                        {ride.origin}
                    </Text>
                </View>

                <View style={styles.routeLine} />

                <View style={styles.routePoint}>
                    <Ionicons
                        name="location"
                        size={12}
                        color={COLORS.danger}
                        style={styles.iconPoint}
                    />
                    <Text
                        variant="bodyBold"
                        style={styles.routeText}
                        numberOfLines={1}
                    >
                        {ride.destination}
                    </Text>
                </View>
            </View>

            <View style={styles.divider} />

            {/* Fecha y hora */}
            <View style={styles.scheduleRow}>
                <View style={styles.footerDetail}>
                    <Ionicons
                        name="calendar-outline"
                        size={14}
                        color={COLORS.textSecondary}
                    />
                    <Text
                        variant="caption"
                        color="textSecondary"
                        style={styles.footerText}
                    >
                        {ride.departureDate} · {ride.departureTime}
                    </Text>
                </View>
            </View>

            {/* Vehículo, asientos y precio */}
            <View style={styles.footer}>
                <View style={styles.vehicleDetail}>
                    <Ionicons
                        name="car-outline"
                        size={14}
                        color={COLORS.textSecondary}
                    />
                    <Text
                        variant="caption"
                        color="textSecondary"
                        style={styles.vehicleText}
                        numberOfLines={1}
                    >
                        {ride.vehicle.brand} {ride.vehicle.model}
                    </Text>
                </View>

                <View style={styles.footerRight}>
                    <Ionicons
                        name="people-outline"
                        size={14}
                        color={COLORS.textSecondary}
                    />
                    <Text variant="caption" color="textSecondary">
                        {ride.availableSeats} disp.
                    </Text>
                    <Text variant="bodyBold" color="primary">
                        C${ride.pricePerSeat}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.background,
        borderRadius: RADIUS.md,
        padding: SPACING.md,
        marginBottom: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    driverInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: SPACING.sm,
    },
    driverTextContainer: {
        flex: 1,
        minWidth: 0,
    },
    avatarPlaceholder: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.surface,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.sm,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    ratingText: {
        marginLeft: 4,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginVertical: SPACING.sm,
    },
    routeContainer: {
        paddingVertical: SPACING.xs / 2,
    },
    routePoint: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconPoint: {
        width: 14,
        marginRight: SPACING.sm,
        textAlign: 'center',
    },
    routeText: {
        flex: 1,
    },
    routeLine: {
        width: 1,
        height: 12,
        backgroundColor: COLORS.border,
        marginLeft: 6,
        marginVertical: 2,
    },
    scheduleRow: {
        marginBottom: SPACING.sm,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    footerDetail: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    footerText: {
        marginLeft: 4,
    },
    vehicleDetail: {
        flex: 1,
        minWidth: 0,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: SPACING.sm,
    },
    vehicleText: {
        flex: 1,
        marginLeft: 4,
    },
    footerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
    },
});