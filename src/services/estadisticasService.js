export function calculateMovieStatistics(reservations, totalSeats) {
    const statsByMovie = {};
  
    reservations.forEach(reservation => {
      const movieId = reservation.movieId;
      const reservedSeats = reservation.asientos.length;
  
      if (!statsByMovie[movieId]) {
        statsByMovie[movieId] = { movieId, totalReservations: 0, reservedSeats: 0 };
      }
  
      statsByMovie[movieId].totalReservations += 1;
      statsByMovie[movieId].reservedSeats += reservedSeats;
    });
  
    return Object.values(statsByMovie).map(stat => ({
      ...stat,
      occupancyRate: ((stat.reservedSeats / totalSeats) * 100).toFixed(2),
      availableSeats: totalSeats - stat.reservedSeats,
    }));
  }