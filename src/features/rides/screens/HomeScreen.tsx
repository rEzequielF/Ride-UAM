import React, { useEffect, useState } from 'react';
import{
    StyleSheet,
    View,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '@/constants/theme';
import { Screen, Text, Button } from '@/constants/ui';
import { Ride } from '../types/ride.types';
import { mockRideService } from '../services/mockRideService';
import { RideCard } from '../components/RideCard';

export const HomeScreen = () => {
    const [rides, setRides] = useState<Ride[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchRides = async () => {
            try{
                setLoading(true);
                setError(null);
                const data = await mockRideService.getAvailableRides();
                if (isMounted){
                    setRides(data);
                }
            } catch (err: unknown){
                if (isMounted){
                    setError('Nose pudieron cargar los viajes disponibles');
                }
            } finally{
                if (isMounted){
                    setLoading(false);
                }
            }
        };

        return () => {
            isMounted = false;
        };
    }, []);

    // proximo viaje asumido como el primer viaje en progreso o reservado
    const nextRide = rides.find((r) => r.status === 'inProgress' || r.status === 'full');
    // lista resumida para Home
    const availableRides = rides.filter((r) => r.status === 'published').slice(0, 3);

    const handleSearchPress = () => {
        // navegar a Buscar cuando las rutas esten configuradas
    };

    const CreatePress = () => {
        // navegar a la pantalla Publicar Ride ''
    };

    const handleRidePress = (rideId: string) => {
        // navegar a RideDetails ''
    };

    return(
        <Screen>
            <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            >
                {/* Header de Bienvenida */}
                <View style={styles.header}>
                    <Text variant="h1">Bienvenido</Text>
                    <Text variant="body" color="textSecondary" style={styles.subtitle}>
                        ¿A dónde vas hoy?
                    </Text>
                </View>

                {/* Accesos Rapidos */}
                <View style={styles.actionsContainer}>
                    <TouchableOpacity
                    style={[styles.actionButton, styles.searchAction]}
                    onPress={handleSearchPress}
                    activeOpacity={0.8}
                    >
                        <Ionicons name="search-outline" size={24} color={COLORS.primary}/>
                        <Text variant="bodyBold" color="primary" style={styles.actionText}>
                            Buscar ride
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    style={[styles.actionButton, styles.createAction]}
                    onPress={handleSearchPress}
                    activeOpacity={0.8}
                    >
                        <Ionicons name="add-circle-outline" size={24} color={COLORS.background}/>
                        <Text variant="bodyBold" color="background" style={styles.actionText}>
                            Publicar ride
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Tu proximo viaje */}
                <View style={styles.section}>
                    <Text variant="h2" style={styles.sectionTitle}>
                        Tu proximo viaje
                    </Text>

                    {loading ? (
                        <ActivityIndicator size="small" color={COLORS.primary} style={styles.loader}/>
                    ) : nextRide ? (
                        <RideCard
                        ride={nextRide}
                        onPress={() => handleRidePress(nextRide.id)}
                        />
                    ) : (
                        <View style={styles.emptyCard}>
                            <Ionicons name="car-sport-outline" size={32} color={COLORS.textSecondary}/>
                            <Text variant="body" color="textSecondary" style={styles.emptyText}>
                                No tienes viajes programados proximamente
                            </Text>
                        </View>
                    )}
                </View>

                {/* Rides Disponibles (resumen) */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text variant="h2">Rides Disponibles</Text>
                   </View>

                    {loading ? (
                    <ActivityIndicator
                    size="small"
                    color={COLORS.primary}
                    style={styles.loader}
                    />
                    ) : error ? (
                    <Text variant="caption" color="danger">
                        {error}
                    </Text>
                    ) : availableRides.length > 0 ? (
                    availableRides.map((ride) => (
                    <RideCard
                    key={ride.id}
                    ride={ride}
                    onPress={() => handleRidePress(ride.id)}
                    />
                    ))
                    ) : (
                    <View style={styles.emptyCard}>
                        <Text variant="body" color="textSecondary">
                            No hay rides disponibles en este momento
                        </Text>
                    </View>
                    )}
                </View>
            </ScrollView>
        </Screen>
    );
};

const styles = StyleSheet.create({
    scrollContent:{
        paddingBottom: SPACING.xl,
    },
    header:{
        marginTop: SPACING.lg,
    },
    subtitle:{
        marginTop: SPACING.xs / 2,
    },
    actionsContainer:{
        flexDirection: 'row',
        gap: SPACING.md,
        marginBottom: SPACING.xl,
    },
    actionButton:{
        flex: 1,
        height: 72,
        borderRadius: RADIUS.md,
        padding: SPACING.md,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    searchAction:{
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    createAction:{
        backgroundColor: COLORS.primary,
    },
    actionText:{
        marginTop: SPACING.xs / 2,
    },
    section:{
        marginBottom: SPACING.lg,
    },
    sectionHeader:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    sectionTitle:{
        marginBottom: SPACING.md,
    },
    loader:{
        paddingVertical: SPACING.lg,
    },
    emptyCard:{
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.md,
        padding: SPACING.lg,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
        borderStyle: 'dashed',
    },
    emptyText:{
        marginTop: SPACING.xs,
        textAlign: 'center',
    },
});