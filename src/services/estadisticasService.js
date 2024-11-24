export function calculateMovieStatistics(reservations, totalSeats) {
    const statsByMovie = {};
  
    // Agrupar reservas por película
    reservations.forEach(reservation => {
      const movieId = reservation.movieId;
      const reservedSeats = reservation.asientos.length;
  
      if (!statsByMovie[movieId]) {
        statsByMovie[movieId] = { movieId, totalReservations: 0, reservedSeats: 0 };
      }
  
      statsByMovie[movieId].totalReservations += 1; // Número total de reservas
      statsByMovie[movieId].reservedSeats += reservedSeats; // Número total de asientos reservados
    });
  
    // Calcular porcentaje de ocupación
    return Object.values(statsByMovie).map(stat => ({
      ...stat,
      occupancyRate: ((stat.reservedSeats / totalSeats) * 100).toFixed(2), // Porcentaje de ocupación
      availableSeats: totalSeats - stat.reservedSeats, // Asientos disponibles
    }));
  }