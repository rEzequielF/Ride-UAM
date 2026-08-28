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
import { Screen, Text } from '@/constants/ui';
import { Ride } from '../types/ride.types';
import { mockRideService } from '../services/mockRideService';
import { RideCard } from '../components/RideCard';

const MOCK_USER_ID = 'usr-driver-1';
const MOCK_USER_NAME = 'Carlos';

export const HomeScreen = () => {
    const [availableRides, setAvailableRides] = useState<Ride[]>([]);
    const [userRides, setUserRides] = useState<Ride[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchRides = async () => {
            try{
                setLoading(true);
                setError(null);
                const [availableData, userData] = await Promise.all([
                    mockRideService.getAvailableRides(),
                    mockRideService.getUserRides(MOCK_USER_ID),
                ]);
                if (isMounted){
                    setAvailableRides(availableData);
                    setUserRides(userData);
                }
            } catch (err: unknown){
                if (isMounted){
                    setError('No se pudieron cargar los viajes disponibles');
                }
            } finally{
                if (isMounted){
                    setLoading(false);
                }
            }
        };

        fetchRides();

        return () => {
            isMounted = false;
        };
    }, []);

    // El contrato actual de RideStatus utiliza 'inProgress'.
    const nextRide = userRides.find(
        (ride) => ride.status === 'inProgress' || ride.status === 'full'
    );
    const availableRidesSummary = availableRides
        .filter((ride) => ride.status === 'published')
        .slice(0, 3);

    const handleSearchPress = () => {
        // navegar a Buscar cuando las rutas esten configuradas
    };

    const handleCreatePress = () => {
        // TODO: navegar a Publicar ride cuando la ruta esté configurada.
    };

    const handleRidePress = (rideId: string) => {
        // TODO: navegar a los detalles cuando la ruta esté configurada.
    };

    return(
        <Screen>
            <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            >
                {/* Header de Bienvenida */}
                <View style={styles.header}>
                    <Text variant="h1">Hola, {MOCK_USER_NAME} 👋</Text>
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
                    onPress={handleCreatePress}
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
                        Tu próximo viaje
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
                                No tienes viajes programados próximamente
                            </Text>
                        </View>
                    )}
                </View>

                {/* Rides Disponibles (resumen) */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text variant="h2">Rides disponibles</Text>
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
                    ) : availableRidesSummary.length > 0 ? (
                    availableRidesSummary.map((ride) => (
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
